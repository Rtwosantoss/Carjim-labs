CREATE TABLE "medical_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"diagnosis" text NOT NULL,
	"observations" text NOT NULL,
	"recommendation" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
