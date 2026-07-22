import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schemas/users";

export class UserRepository {
  async findAll() {
    return await db.select().from(users);
  }

  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  async create(data: typeof users.$inferInsert) {
    const result = await db.insert(users).values(data).returning();
    return result.length > 0 ? result[0] : null;
  }
}
