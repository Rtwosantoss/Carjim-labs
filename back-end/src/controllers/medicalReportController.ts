import { Request, Response } from "express";
import { MedicalReportService } from "../services/medicalReportService";

export class MedicalReportController {

    constructor(
        private readonly service: MedicalReportService
    ) {}

    findAll = async(_req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Fetching all medical reports", _req.params);
            const reports = await this.service.findAll();
            return res.status(200).json(reports);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching medical reports",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    findById = async(req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Fetching medical report with ID:", req.params.id);
            const report = await this.service.findById(Number(req.params.id));
            if (!report) {
                return res.status(404).json({
                    message: "Medical report not found"
                });
            }
            return res.status(200).json(report);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching medical report",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    create = async(req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Creating medical report with data:", req.body);
            const report = await this.service.create(req.body);
            return res.status(201).json(report);
        } catch (error) {
            return res.status(500).json({
                message: "Error creating medical report",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    update = async(req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Updating medical report with ID:", req.params.id, "and data:", req.body);
            const report = await this.service.update(Number(req.params.id), req.body);
            if (!report) {
                return res.status(404).json({
                    message: "Medical report not found",
                });
            }
            return res.status(200).json(report);
        } catch (error) {
            return res.status(500).json({
                message: "Error updating medical report",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }

    }
    
    delete = async(req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Deleting medical report with ID:", req.params.id);
            await this.service.delete(Number(req.params.id));
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting medical report",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}