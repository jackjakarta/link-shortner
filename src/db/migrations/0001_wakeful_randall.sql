ALTER TABLE "short_link" ADD COLUMN "qr_code_s3_key" text;--> statement-breakpoint
ALTER TABLE "short_link" DROP COLUMN IF EXISTS "qr_code_url";