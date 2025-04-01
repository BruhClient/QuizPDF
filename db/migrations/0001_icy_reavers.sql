CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'editor');--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hashedPassword" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isOauth" boolean;