ALTER TABLE "passwordToken" ALTER COLUMN "code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordToken" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "email" SET NOT NULL;