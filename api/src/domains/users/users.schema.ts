import { text, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { rooms } from '../rooms/rooms.schema';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  fullName: text('full_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  rooms: many(rooms),
}));

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);
