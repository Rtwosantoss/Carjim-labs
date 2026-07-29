import { Router, Request, Response } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import medicalReportRoutes from "./medicalReport.routes";
import bloodSampleRoutes from "./bloodSampleImage.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/medical-reports", medicalReportRoutes);
router.use("/blood-sample-image", bloodSampleRoutes);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;