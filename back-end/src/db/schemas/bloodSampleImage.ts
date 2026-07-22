import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const bloodSampleImages = pgTable('blood_sample_image', {
    id: serial('id').primaryKey(),
    imagePath: text('image_path').notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
})