
import { ZodType, z } from "zod";

export type ConversationSearchProps = {
    query: string;
    domain: string;
}

export type ChatBotMessageProps = {
     content?: string;
        image?: any;
}

export const ConversationSearchSchema: ZodType<ConversationSearchProps> =
    z.object({
        query: z.string().min(1, { message: 'Bir arama sorgusu girmelisiniz' }),
        domain: z.string().min(1, { message: 'Bir domain seçmelisiniz' })
    })


export const ChatBotMessageSchema: ZodType<ChatBotMessageProps> =
    z
        .object({
            content: z
                .string()
                .min(1)
                .optional()
                .or(
                    z.literal('').transform(() => undefined)
                ),
            image: z.any().optional(),
        })
        .refine((schema) => {
            if(schema.image?.length) {
                ACCEPTED_FILE_TYPES.includes(schema.image[0].type!) && 
                schema.image[0].size < MAX_UPLOAD_SIZE
            } {
                return true
            }
        })