import { text, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  fullName: text('full_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
