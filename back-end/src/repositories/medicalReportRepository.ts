import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { medicalReports } from '../db/schemas/medicalReports';  

export class MedicalReportRepository {

    async findAll() {
        return await db.select().from(medicalReports);
    }

    async findById(id: number) {
        const report = await db
        .select()
        .from(medicalReports)
        .where(eq(medicalReports.id, id))
        .limit(1);

        return report.length > 0 ? report[0] : null;
    }

    async create(data: typeof medicalReports.$inferInsert) {
        const report = await db
        .insert(medicalReports)
        .values(data)
        .returning();

        return report.length > 0 ? report[0] : null;
    }

    async update(id: number, data: Partial<typeof medicalReports.$inferInsert>) {
        const report = await db
        .update(medicalReports)
        .set(data)
        .where(eq(medicalReports.id, id))
        .returning();

        return report.length > 0 ? report[0] : null;
    }

    async delete(id: number) {
        await db
        .delete(medicalReports)
        .where(eq(medicalReports.id, id));
    }
}