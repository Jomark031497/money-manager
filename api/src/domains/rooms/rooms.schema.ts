import { boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';
import { users } from '../users/users.schema';

export const rooms = pgTable('rooms', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  name: varchar('name').unique().notNull(),
  creatorId: varchar('creator_id', { length: 21 }).notNull(),
  isPrivate: boolean('is_private').default(false),
  password: varchar('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const selectRoomSchema = createSelectSchema(rooms);
export const insertRoomSchema = createInsertSchema(rooms, {
  creatorId: z.string().length(21, 'invalid creator id, please enter a valid creator id'),
});

export const roomsRelations = relations(rooms, ({ one }) => ({
  user: one(users, {
    fields: [rooms.creatorId],
    references: [users.id],
  }),
}));
