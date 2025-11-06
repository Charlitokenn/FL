CREATE TYPE "public"."approval_status" AS ENUM('APPROVED', 'REJECTED', 'PENDING');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"approval_status" "approval_status" DEFAULT 'PENDING' NOT NULL,
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
