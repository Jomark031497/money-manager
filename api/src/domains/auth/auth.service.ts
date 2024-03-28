import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createUser, getUserByEmail, getUserById } from '../users/users.service.js';
import { users } from '../users/users.schema.js';
import { lucia } from '../../lib/lucia.js';
import { AppError } from '../../utils/AppError.js';
import { verify } from 'argon2';

export const signUp = async (payload: InferInsertModel<typeof users>) => {
  const user = await createUser(payload);
  if (!user) throw new AppError(404, 'failed to create user');

  const session = await lucia.createSession(user.id, {});

  return session;
};

export const login = async (payload: Pick<InferSelectModel<typeof users>, 'email' | 'password'>) => {
  const user = await getUserByEmail(payload.email);
  if (!user) throw new AppError(404, 'invalid email/password');

  const validPassword = await verify(user.password, payload.password);
  if (!validPassword) throw new AppError(404, 'invalid email/password');

  const session = await lucia.createSession(user.id, {});

  return session;
};

export const signOut = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);

  return { message: 'logout success' };
};

export const getCurrentAuthenticatedUser = async (id: string) => {
  const user = await getUserById(id, false);
  if (!user) throw new AppError(400, 'user not found');
  return user;
};
