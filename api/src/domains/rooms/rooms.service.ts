import { InferInsertModel, eq } from 'drizzle-orm';
import { rooms } from './rooms.schema';
import { db } from '../../db';
import { AppError } from '../../utils/AppError';
import { users } from '../users/users.schema';
import { getUserById } from '../users/users.service';
import { hash } from 'argon2';

export const getRoomById = async (id: string) => {
  const results = await db.select().from(rooms).where(eq(rooms.id, id));
  return results[0];
};

export const getRoomByName = async (name: string) => {
  const results = await db.select().from(rooms).where(eq(rooms.name, name));
  return results[0];
};

export const getRooms = async () => {
  const results = await db.select().from(rooms).leftJoin(users, eq(rooms.creatorId, users.id));
  return results;
};

export const createRoom = async (payload: InferInsertModel<typeof rooms>) => {
  const room = await getRoomByName(payload.name);
  if (room) throw new AppError(400, 'unable to create room', { name: 'room name is already taken' });

  const userExists = await getUserById(payload.creatorId);
  if (!userExists) throw new AppError(400, 'unable to create room', { name: 'invalid creator id' });

  const hashedPassword = payload.password ? await hash(payload.password) : null;

  await db.insert(rooms).values({
    ...payload,
    password: hashedPassword,
  });

  return { message: 'room successfully created' };
};

export const updateRoom = async (id: string, payload: InferInsertModel<typeof rooms>) => {
  const room = await getRoomById(id);
  if (!room) throw new AppError(404, 'unable to update room', { id: 'room id not found' });

  await db
    .update(rooms)
    .set({
      ...room,
      ...payload,
    })
    .where(eq(rooms.id, id));

  return { message: 'room successfully updated' };
};

export const deleteRoom = async (id: string) => {
  const room = await getRoomById(id);
  if (!room) throw new AppError(404, 'unable to update room', { id: 'room id not found' });

  await db.delete(rooms).where(eq(rooms.id, id));

  return { message: 'room successfully deleted' };
};
