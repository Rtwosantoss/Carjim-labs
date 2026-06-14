import { Router } from "express";
import { MedicalReportController } from "../controllers/medicalReportController";
import { MedicalReportRepository } from "../repositories/medicalReportRepository";
import { MedicalReportService } from "../services/medicalReportService";

const router = Router();

const repository = new MedicalReportRepository();
const service = new MedicalReportService(repository);
const controller = new MedicalReportController(service);

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;