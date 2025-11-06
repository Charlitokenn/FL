import { varchar, uuid, pgTable, pgEnum,date, timestamp } from 'drizzle-orm/pg-core';

export const APPROVAL_STATUS_ENUM = pgEnum('approval_status', ['APPROVED', 'REJECTED', 'PENDING']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar('full_name').notNull(),
  email: varchar('email').notNull().unique(),
  status: APPROVAL_STATUS_ENUM('approval_status').notNull().default('PENDING'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at',{withTimezone:true}).defaultNow(),
});