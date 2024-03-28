import { z } from "zod";

export const authSchema = z.object({
  id: z.string(),
  email: z.string().email().min(3).max(150),
  password: z.string().min(6).max(150),
  fullName: z.string().optional(),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
