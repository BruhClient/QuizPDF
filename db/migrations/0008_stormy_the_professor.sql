ALTER TABLE "test" RENAME TO "quiz";--> statement-breakpoint
ALTER TABLE "quiz" RENAME COLUMN "textType" TO "quizType";--> statement-breakpoint
ALTER TABLE "quiz" DROP CONSTRAINT "test_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;