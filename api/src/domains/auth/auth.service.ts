import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createUser, getUserByEmail, getUserById } from '../users/users.service';
import { users } from '../users/users.schema';
import { lucia } from '../../lib/lucia';
import { AppError } from '../../utils/AppError';
import { verify } from 'argon2';

export const signUp = async (payload: InferInsertModel<typeof users>) => {
  const user = await createUser(payload);
  if (!user) throw new AppError(404, 'failed to create user');

  const session = await lucia.createSession(user.id, {});

  return {
    session,
    user,
  };
};

export const login = async (payload: Pick<InferSelectModel<typeof users>, 'email' | 'password'>) => {
  const user = await getUserByEmail(payload.email, true);
  if (!user || !user.password) throw new AppError(404, 'invalid email/password');

  const validPassword = await verify(user.password, payload.password);
  if (!validPassword) throw new AppError(404, 'invalid email/password');

  const session = await lucia.createSession(user.id, {});

  return {
    session,
    user,
  };
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
