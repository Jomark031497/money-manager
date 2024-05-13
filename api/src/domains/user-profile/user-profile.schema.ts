import { pgTable, text, time, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from '../users/users.schema';

export const userProfile = pgTable('user_profile', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  userId: varchar('user_id').references(() => users.id),
  bio: text('bio'),
  profilePicture: varchar('profile_picture'),
  availabilityStart: time('availability_start'),
  availabilityEnd: time('availability_end'),
  availabilityDays: varchar('availability_days'),
});
