import { bloodSampleImages } from "../db/schema"
import {db} from "../db/client"
import {eq} from 'drizzle-orm'

export const bloodSampleRepository = {
    async create(imagePath: string) {
        const [image] = await db.insert(bloodSampleImages).values({imagePath}).returning();
        return image
    },

    async getById(id: number) {
        const [image] = await db.select().from(bloodSampleImages).where(eq(bloodSampleImages.id,id));
        return image
    },

    async getAll(imagePath: string){
        const [image] = await db.select().from(bloodSampleImages)
        return image
    },

    async delete(id: number){
        const [image] = await db.delete(bloodSampleImages).where(eq(bloodSampleImages.id,id))
    }
}