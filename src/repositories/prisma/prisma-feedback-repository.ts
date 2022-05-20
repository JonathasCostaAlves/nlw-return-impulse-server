import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from './../feedbacks-repositories';

export class PrismaFeedbackRepository implements FeedbacksRepository{
    async create ({type, comment, screenshot}: FeedbackCreateData){
        await prisma.feedbacks.create({
            data: {
                type,
                comment,
                screenshot,
            }
        }) 
    }
}