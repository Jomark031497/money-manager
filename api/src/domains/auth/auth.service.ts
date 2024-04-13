import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createUser, getUserById, getUserByUsername } from '../users/users.service';
import { users } from '../users/users.schema';
import { lucia } from '../../lib/lucia';
import { AppError } from '../../utils/AppError';
import { verify } from 'argon2';
import { excludeFields } from '../../utils/excludeFields';

export const signUp = async (payload: InferInsertModel<typeof users>) => {
  const user = await createUser(payload);
  if (!user) throw new AppError(404, 'sign up failed');

  const session = await lucia.createSession(user.id, {});

  return {
    session,
    user: excludeFields(user, ['password']),
  };
};

export const login = async (payload: Pick<InferSelectModel<typeof users>, 'username' | 'password'>) => {
  const user = await getUserByUsername(payload.username, true);
  if (!user || !user.password)
    throw new AppError(404, 'login failed', {
      username: 'invalid username',
      password: 'invalid password',
    });

  const validPassword = await verify(user.password, payload.password);
  if (!validPassword)
    throw new AppError(404, 'login failed', {
      username: 'invalid username',
      password: 'invalid password',
    });

  const session = await lucia.createSession(user.id, {});

  return {
    session,
    user: excludeFields(user, ['password']),
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
