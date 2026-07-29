import { BloodSampleRepository } from "../repositories/bloodSampleImageRepository";

export class BloodSampleImageService {

    constructor(
        private readonly repository: BloodSampleRepository
    ) {}

    async getAll() {
        return await this.repository.getAll();
    }

    async getById(id: number) {
        return await this.repository.getById(id);
    }

    async create(imagePath: string) {
        return await this.repository.create(imagePath);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }
}