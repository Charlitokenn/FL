CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
CREATE TYPE "public"."id_type" AS ENUM('NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'VOTER_ID');--> statement-breakpoint
CREATE TYPE "public"."relationship" AS ENUM('PARENT', 'SIBLING', 'SPOUSE', 'FRIEND', 'OTHER');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text,
	"mobile_number" text,
	"alt_mobile_number" text,
	"email" text,
	"id_type" "id_type",
	"id_number" text,
	"region" text,
	"district" text,
	"ward" text,
	"street" text,
	"first_NOK_Name" text,
	"first_NOK_Mobile" text,
	"first_NOK_Relationship" "relationship",
	"second_NOK_Name" text,
	"second_NOK_Mobile" text,
	"second_NOK_Relationship" "relationship",
	"clientPhoto" text,
	"gender" "gender",
	"acquisitionDate" smallint,
	"added_by" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "contacts_clientPhoto_unique" UNIQUE("clientPhoto")
);
