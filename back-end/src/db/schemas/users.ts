import {
  pgTable,
  pgEnum,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "client"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email")
    .notNull()
    .unique(),

  password: text("password").notNull(),

  role: userRoleEnum("role").default("client").notNull(),

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