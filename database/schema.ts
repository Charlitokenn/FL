import { varchar, uuid, pgTable, pgEnum, date, timestamp, text, smallint} from 'drizzle-orm/pg-core';

export const APPROVAL_STATUS_ENUM = pgEnum('approval_status', ['APPROVED', 'REJECTED', 'PENDING']);
export const GENDER_ENUM = pgEnum('gender', ['MALE', 'FEMALE']);
export const ID_TYPE_ENUM = pgEnum('id_type', ['NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'VOTER_ID']);
export const RELATIONSHIP_ENUM = pgEnum('relationship', ['PARENT', 'SIBLING', 'SPOUSE', 'FRIEND', 'OTHER']);

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

export const contacts = pgTable('contacts', { 
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name'),   
  mobileNumber: text('mobile_number'),
  altMobileNumber: text('alt_mobile_number'),
  email: text('email'),
  idType: ID_TYPE_ENUM('id_type'),
  idNumber: text('id_number'),
  region: text('region'),
  district: text('district'),
  ward: text('ward'),
  street: text('street'),  
  firstNOKName: text('first_NOK_Name'),
  firstNOKMobile: text('first_NOK_Mobile'),
  firstNOKRelationship: RELATIONSHIP_ENUM('first_NOK_Relationship'),  
  secondNOKName: text('second_NOK_Name'),
  secondNOKMobile: text('second_NOK_Mobile'),
  secondNOKRelationship: RELATIONSHIP_ENUM('second_NOK_Relationship'),
  clientPhoto: text('clientPhoto').unique(),
  gender: GENDER_ENUM('gender'),
  acquisitionDate: smallint('acquisitionDate'),
  addedBy: text('added_by'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});