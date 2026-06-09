import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignRoles,
} from "../controllers/user.controller.js";
import {
  createUserValidator,
  updateUserValidator,
  assignRolesValidator,
} from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const userRouter = Router();

userRouter.use(authMiddleware, checkRole("ADMIN"));

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUserValidator, validate, createUser);
userRouter.put("/:id", updateUserValidator, validate, updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id/roles", assignRolesValidator, validate, assignRoles);

export default userRouter;
