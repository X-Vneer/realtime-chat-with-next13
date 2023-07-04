import { z } from 'zod'

export const messageValidator = z.object({
    id: z.string(),
    text: z.string(),
    timestamp: z.number(),
    senderId: z.string(),
    receiverId: z.string(),
})


export const arrayMessageValidator = z.array(messageValidator)