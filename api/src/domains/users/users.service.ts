import { InferInsertModel, eq } from 'drizzle-orm';
import { users } from './users.schema';
import { db } from '../../db/index';
import { AppError } from '../../utils/AppError';
import { hash } from 'argon2';

const getColumnResults = {
  id: users.id,
  email: users.email,
  username: users.username,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export const getUsers = async () => {
  const results = await db.select(getColumnResults).from(users);
  return results;
};

export const getUserById = async (id: string, includePassword: boolean = false) => {
  const results = await db
    .select({
      ...getColumnResults,
      ...(includePassword && {
        password: users.password,
      }),
    })
    .from(users)
    .where(eq(users.id, id));

  return results[0];
};

export const getUserByEmail = async (email: string, includePassword: boolean = false) => {
  const results = await db
    .select({
      ...getColumnResults,
      ...(includePassword && {
        password: users.password,
      }),
    })
    .from(users)
    .where(eq(users.email, email));

  return results[0];
};

export const getUserByUsername = async (username: string, includePassword: boolean = false) => {
  const results = await db
    .select({
      ...getColumnResults,
      ...(includePassword && {
        password: users.password,
      }),
    })
    .from(users)
    .where(eq(users.username, username));

  return results[0];
};

export const createUser = async (payload: InferInsertModel<typeof users>) => {
  const emailExists = await getUserByEmail(payload.email);
  if (emailExists) throw new AppError(400, 'Unable to create user', { email: 'email is already taken' });

  const userExists = await getUserByUsername(payload.username);
  if (userExists)
    throw new AppError(400, 'Unable to create user', {
      email: 'username is already taken',
    });

  const hashedPassword = await hash(payload.password);

  const queryResults = await db
    .insert(users)
    .values({ ...payload, password: hashedPassword })
    .returning();

  return queryResults[0];
};

export const updateUser = async (id: string, payload: InferInsertModel<typeof users>) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, 'unable to update user', { id: 'user id not found' });

  await db
    .update(users)
    .set({ ...user, ...payload })
    .where(eq(users.id, id));

  return { message: 'user updated' };
};

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, 'unable to delete user', { id: 'user id not found' });

  await db.delete(users).where(eq(users.id, id));
  return { message: 'user deleted' };
};
