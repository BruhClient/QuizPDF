ALTER TABLE "session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
ALTER TABLE "authenticator" RENAME TO "passwordToken";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP CONSTRAINT "authenticator_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "passwordToken" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordToken" ADD COLUMN "code" text;--> statement-breakpoint
ALTER TABLE "passwordToken" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordToken" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "emailReplaced" text;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "expiresAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "credentialID";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "providerAccountId";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "credentialPublicKey";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "counter";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "credentialDeviceType";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "credentialBackedUp";--> statement-breakpoint
ALTER TABLE "passwordToken" DROP COLUMN "transports";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN "identifier";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN "expires";--> statement-breakpoint
ALTER TABLE "passwordToken" ADD CONSTRAINT "passwordToken_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_unique" UNIQUE("email");