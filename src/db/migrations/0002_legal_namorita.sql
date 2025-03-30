DO $$ BEGIN
 CREATE TYPE "public"."short_link_source" AS ENUM('email', 'discord', 'github', 'twitter', 'reddit', 'linkedin', 'facebook', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "short_link_click" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_link_id" uuid NOT NULL,
	"source" "short_link_source" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "short_link_click" ADD CONSTRAINT "short_link_click_short_link_id_short_link_id_fk" FOREIGN KEY ("short_link_id") REFERENCES "public"."short_link"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
