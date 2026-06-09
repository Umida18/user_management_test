import { Router } from "express";
import { getAllRoles } from "../controllers/role.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const roleRouter = Router();

roleRouter.get("/", authMiddleware, checkRole("ADMIN"), getAllRoles);

export default roleRouter;
