CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"role" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
