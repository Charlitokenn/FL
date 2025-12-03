ALTER TABLE "contacts" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_deleted" boolean DEFAULT false;