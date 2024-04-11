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
  const results = await db
    .select({
      id: rooms.id,
      name: rooms.name,
      userId: rooms.userId,
      isPrivate: rooms.isPrivate,
    })
    .from(rooms);
  return results;
};

export const createRoom = async (payload: InferInsertModel<typeof rooms>) => {
  const room = await getRoomByName(payload.name);
  if (room)
    throw new AppError(400, 'unable to create room', {
      name: 'room name is already taken',
    });

  if (payload.isPrivate) {
    if (!payload.password)
      throw new AppError(400, 'unable to create room', {
        password: 'room is private. password is required',
      });
  }

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

export const updateRoom = async (id: string, payload: InferInsertModel<typeof rooms>) => {
  const room = await getRoomById(id);
  if (!room)
    throw new AppError(404, 'unable to update room', {
      id: 'room id not found',
    });

  if (payload.isPrivate) {
    if (!payload.password)
      throw new AppError(400, 'unable to create room', {
        password: 'room is private. password is required',
      });
  }

  return await db
    .update(rooms)
    .set({
      ...room,
      ...payload,
      ...(!payload.isPrivate && {
        password: null,
      }),
    })
    .where(eq(rooms.id, id))
    .returning();
};

export const deleteRoom = async (id: string) => {
  const room = await getRoomById(id);
  if (!room)
    throw new AppError(404, 'unable to update room', {
      id: 'room id not found',
    });

  await db.delete(rooms).where(eq(rooms.id, id));

  return {
    message: 'room successfully deleted',
  };
};
