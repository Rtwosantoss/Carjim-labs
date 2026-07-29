import { bloodSampleImages } from "../db/schema"
import {db} from "../db/client"
import {eq} from 'drizzle-orm'

export class BloodSampleRepository {
    async create(imagePath: string) {
        const [image] = await db.insert(bloodSampleImages).values({imagePath}).returning();
        return image;
    }

    async getById(id: number) {
        const [image] = await db.select().from(bloodSampleImages).where(eq(bloodSampleImages.id,id));
        return image;
    }

    async getAll(){
        const images = await db.select().from(bloodSampleImages);
        return images;
    }

    async delete(id: number){
        const [image] = await db.delete(bloodSampleImages).where(eq(bloodSampleImages.id,id)).returning();
        return image;
    }


}