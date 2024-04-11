import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const rooms = pgTable('rooms', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  name: varchar('name').unique().notNull(),
  password: varchar('password'),
  userId: varchar('user_id', { length: 21 }).notNull(),
  isPrivate: boolean('is_private').default(false),
});

export const insertRoomSchema = createInsertSchema(rooms, {
  userId: z.string().length(21, 'invalid user_id, please enter a valid user_id'),
});

export const selectRoomSchema = createSelectSchema(rooms);
