CREATE TYPE "public"."user_role" AS ENUM('admin', 'client');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'client' NOT NULL;