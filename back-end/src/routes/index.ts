import { Router, Request, Response } from "express";

import userRoutes from "./user.routes";
import medicalReportRoutes from "./medicalReport.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/medical-reports", medicalReportRoutes);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;