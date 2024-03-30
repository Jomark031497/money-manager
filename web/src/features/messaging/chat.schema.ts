import { z } from 'zod';

export const chatSchema = z.object({
  body: z.string().min(1).max(150),
  userId: z.string().min(1).max(150),
  date: z.date(),
});

export const messageSchema = chatSchema.pick({
  body: true,
  userId: true,
  date: true,
});

export type MessageType = z.infer<typeof messageSchema> & { id: string };
