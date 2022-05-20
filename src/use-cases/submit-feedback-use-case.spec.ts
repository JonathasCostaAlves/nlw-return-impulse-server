import { SubmiteFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmiteFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
    // {create: async ()=>{}},
    // {sendMail: async ()=>{}}
)

describe('Submit feedback', ()=>{
    it('should be able to submit a feedback', async ()=>{      

        await expect( submitFeedback.execute({
            type:"BUG",
            comment:"Comentario do teste",
            screenshot:"data:image/png;base64,iwdeihodajioafdfad6g5adg69"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    })
    it('should not be able to submit a feedback whitout type', async ()=>{      

        await expect( submitFeedback.execute({
            type:"",
            comment:"Comentario do teste",
            screenshot:"data:image/png;base64,iwdeihodajioafdfad6g5adg69"
        })).rejects.toThrow();

    })
    it('should not be able to submit a feedback whitout comment', async ()=>{      

        await expect( submitFeedback.execute({
            type:"BUG",
            comment:"",
            screenshot:"data:image/png;base64,iwdeihodajioafdfad6g5adg69"
        })).rejects.toThrow();

    })
    it('should not be able to submit a feedback whitout screenshot', async ()=>{      

        await expect( submitFeedback.execute({
            type:"BUG",
            comment:"Ta tudo bugado",
            screenshot:"123.jpg"
        })).rejects.toThrow();

    })
})