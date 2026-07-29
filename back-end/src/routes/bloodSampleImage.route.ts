import { Router } from "express";
import { BloodSampleController } from "../controllers/BloodSampleContollerImage";
import { BloodSampleImageService } from "../services/BloodSampleImageService";
import { BloodSampleRepository } from "../repositories/bloodSampleImageRepository";
import multer from "multer";

const router = Router()
const upload = multer({dest: "uploads/"})

const repository = new BloodSampleRepository();
const service = new BloodSampleImageService(repository)
const controller = new BloodSampleController(service)

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/",upload.single("file"), controller.create)
router.delete("/:id", controller.delete)

export default router