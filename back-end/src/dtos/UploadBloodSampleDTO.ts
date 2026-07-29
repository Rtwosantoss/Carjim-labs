import { InferSelectModel } from 'drizzle-orm';
import { bloodSampleImages } from '../db/schemas/bloodSampleImage';

export interface UploadBloodSampleDTO {
  file: Express.Multer.File;
}

export type BloodSampleImage = InferSelectModel<typeof bloodSampleImages>;