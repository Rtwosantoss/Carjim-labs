import { MedicalReportRepository } from "../repositories/medicalReportRepository";

export class MedicalReportService {

    constructor(
        private readonly repository: MedicalReportRepository
    ) {}

    async findAll() {
        return await this.repository.findAll();
    }

    async findById(id: number) {
        return await this.repository.findById(id);
    }

    async create(data: Parameters<MedicalReportRepository["create"]>[0]) {
        return await this.repository.create(data);
    }

    async update(
        id: number, 
        data: Parameters<MedicalReportRepository["update"]>[1]
    ) {
        return await this.repository.update(id, data);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }
}