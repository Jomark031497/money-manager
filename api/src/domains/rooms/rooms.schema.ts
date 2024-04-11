import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const rooms = pgTable('rooms', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  name: varchar('name').unique().notNull(),
  userId: varchar('user_id', { length: 21 }).notNull(),
});

export const selectRoomSchema = createSelectSchema(rooms);
export const insertRoomSchema = createInsertSchema(rooms, {
  userId: z.string().length(21, 'invalid user_id, please enter a valid user_id'),
});

export const roomUsers = pgTable('room_users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
});
