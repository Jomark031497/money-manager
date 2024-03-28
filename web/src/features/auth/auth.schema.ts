import { z } from 'zod';

export const authSchema = z.object({
  id: z.string(),
  email: z.string().email('Please enter a valid email address').min(3).max(150),
  password: z.string().min(6, 'Password must be at least 6 characters').max(150),
  fullName: z.string().optional(),
});

export const signUpSchema = authSchema.omit({
  id: true,
});

export const LoginSchema = authSchema.pick({
  email: true,
  password: true,
});

export type UserType = z.infer<typeof authSchema>;

export type LoginInputsType = Pick<UserType, 'email' | 'password'>;

export type SignUpInputsType = Omit<UserType, 'id'>;
