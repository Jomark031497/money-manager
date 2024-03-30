import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from '../users/users.schema';

export const rooms = pgTable('rooms', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  name: varchar('name').unique().notNull(),
  password: varchar('password'),
  createdBy: varchar('created_by').notNull(),
});

export const roomsRelations = relations(rooms, ({ one }) => ({
  createdBy: one(users, {
    fields: [rooms.createdBy],
    references: [users.id],
  }),
}));
