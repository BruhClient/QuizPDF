CREATE TABLE "test" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"questions" jsonb NOT NULL,
	"textType" text NOT NULL,
	"questionNum" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "test" ADD CONSTRAINT "test_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;