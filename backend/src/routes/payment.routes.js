import { Router } from "express";
import { getPayments } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const paymentRouter = Router();

paymentRouter.get("/", authMiddleware, checkRole("PAYMENT"), getPayments);

export default paymentRouter;
