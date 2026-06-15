import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./client";
import { users } from "./schemas/users";
import { eq } from "drizzle-orm";

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  if (!email || !password || !name) {
    console.error("Missing ADMIN_EMAIL, ADMIN_PASSWORD or ADMIN_NAME in environment");
    process.exit(1);
  }

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existing.length > 0) {
    console.log(`Admin user '${email}' already exists. Skipping.`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Admin user '${email}' created successfully.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
