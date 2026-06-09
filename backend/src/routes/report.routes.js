import { Router } from "express";
import { getReports } from "../controllers/report.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const reportRouter = Router();

reportRouter.get("/", authMiddleware, checkRole("REPORTS"), getReports);

export default reportRouter;
