import { Router } from "express";

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import roleRouter from "./role.routes.js";
import reportRouter from "./report.routes.js";
import paymentRouter from "./payment.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/reports", reportRouter);
router.use("/payments", paymentRouter);

export default router;
