import { pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { rooms } from '../rooms/rooms.schema';
import { userClients } from '../user-clients/user-clients.schema';

const USER_ROLES = ['user', 'friend', 'admin'] as const;
export const rolesEnum = pgEnum('roles', USER_ROLES);

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  username: varchar('username').unique().notNull(),
  role: rolesEnum('roles').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  rooms: many(rooms),
  clientToFriend: many(userClients),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
