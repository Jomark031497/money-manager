import { z } from 'zod';

export const authSchema = z.object({
  id: z.string(),
  email: z.string().email('Please enter a valid email address').min(3).max(150),
  password: z.string().min(6, 'Password must be at least 6 characters').max(150),
  username: z.string().min(6, 'username must be at least 6 characters').max(150),
});

export const signUpSchema = authSchema.omit({
  id: true,
});

export const LoginSchema = authSchema.pick({
  username: true,
  password: true,
});

export type UserType = z.infer<typeof authSchema>;

export type LoginInputsType = Pick<UserType, 'username' | 'password'>;

export type SignUpInputsType = Omit<UserType, 'id'>;
