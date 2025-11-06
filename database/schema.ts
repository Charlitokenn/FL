import { varchar, uuid, pgTable, pgEnum, date, timestamp } from 'drizzle-orm/pg-core';

export const APPROVAL_STATUS_ENUM = pgEnum('approval_status', ['APPROVED', 'REJECTED', 'PENDING']);

export const tenants = pgTable('tenants', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  subdomain: varchar('subdomain').notNull().unique(),
  clerkOrgId: varchar('clerk_org_id').notNull().unique(), // Clerk organization ID
  ownerId: varchar('owner_id').notNull(), // Clerk user ID
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar('full_name').notNull(),
  email: varchar('email').notNull().unique(),
  status: APPROVAL_STATUS_ENUM('approval_status').notNull().default('PENDING'),
  tenantId: uuid('tenant_id').references(() => tenants.id).notNull(),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});