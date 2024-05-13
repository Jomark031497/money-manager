import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { users } from '../users/users.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const userClients = pgTable(
  'user_clients',
  {
    clientId: varchar('client_id').notNull(),
    friendId: varchar('friend_id').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.clientId, table.friendId] }),
  }),
);

export const userClientsRelations = relations(userClients, ({ one }) => ({
  client: one(users, {
    fields: [userClients.clientId],
    references: [users.id],
  }),
}));

export const insertUserClientsSchema = createInsertSchema(userClients);
export const selectUserClientsSchema = createSelectSchema(userClients);
