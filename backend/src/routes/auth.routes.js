import { Router } from "express";

import { login, getMe } from "../controllers/auth.controller.js";
import { loginValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", loginValidator, validate, login);
authRouter.get("/me", authMiddleware, getMe);

export default authRouter;
