import { NodemailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmiteFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express'


export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksReposytory = new PrismaFeedbackRepository()
    const nodemailerAdapter = new NodemailerAdapter()

    const submiteFeedbackUseCase =  new SubmiteFeedbackUseCase(
        prismaFeedbacksReposytory,
        nodemailerAdapter
        )

    await submiteFeedbackUseCase.execute({
        type, 
        comment,
        screenshot
    })

   
    return res.status(201).send()

})