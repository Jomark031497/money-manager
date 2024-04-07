import { InferInsertModel, eq } from 'drizzle-orm';
import { rooms } from './rooms.schema';
import { db } from '../../db';
import { AppError } from '../../utils/AppError';
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
  const results = await db.select().from(rooms);
  return results;
};

export const createRoom = async (payload: InferInsertModel<typeof rooms>) => {
  const room = await getRoomByName(payload.name);
  if (room) throw new AppError(400, 'room name is already taken');

  const hashedPassword = payload.password ? await hash(payload.password) : '';

  const results = await db
    .insert(rooms)
    .values({
      ...payload,
      ...(payload.password && {
        password: hashedPassword,
      }),
    })
    .returning();

  return results[0];
};
