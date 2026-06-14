import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const medicalReports = pgTable("medical_reports", {
  id: serial("id").primaryKey(),

  diagnosis: text("diagnosis").notNull(),

  observations: text("observations").notNull(),

  recommendation: text("recommendation").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .$onUpdate(() => new Date())
    .defaultNow()
    .notNull(),
});