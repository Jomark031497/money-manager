import { InferInsertModel, eq } from 'drizzle-orm';
import { users } from './users.schema';
import { db } from '../../db/index';
import { AppError } from '../../utils/AppError';
import { hash } from 'argon2';

export const createUser = async (payload: InferInsertModel<typeof users>) => {
  const emailResults = await db.select().from(users).where(eq(users.email, payload.email));
  if (emailResults.length) throw new AppError(400, 'email is already taken.');

  const hashedPassword = await hash(payload.password);
  const results = await db
    .insert(users)
    .values({
      ...payload,
      password: hashedPassword,
    })
    .returning();

  return results[0];
};

export const getUsers = async () => {
  const results = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);
  return results;
};

export const getUserById = async (id: string, includePassword: boolean = false) => {
  const results = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
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
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      ...(includePassword && {
        password: users.password,
      }),
    })
    .from(users)
    .where(eq(users.email, email));

  return results[0];
};

export const updateUser = async (id: string, payload: InferInsertModel<typeof users>) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, 'user not found');

  await db
    .update(users)
    .set({
      ...user,
      ...payload,
    })
    .where(eq(users.id, id));

  return { message: 'user updated' };
};

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, 'user not found');

  await db.delete(users).where(eq(users.id, id));
  return { message: 'user deleted' };
};
