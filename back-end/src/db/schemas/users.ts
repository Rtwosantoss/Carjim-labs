import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email")
    .notNull()
    .unique(),

  password: text("password").notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

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