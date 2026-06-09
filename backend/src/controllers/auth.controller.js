import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/hashPassword.js";
import { success, error } from "../utils/apiResponse.js";
import jwtConfig from "../config/jwt.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return error(res, "Foydalanuvchi maili mavjud emas.", 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return error(res, "Parol noto'g'ri.", 401);
    }

    const roles = user.userRoles.map((ur) => ur.role.name);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );

    return success(res, {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return error(res, "Foydalanuvchi topilmadi.", 404);
    }

    const roles = user.userRoles.map((ur) => ur.role.name);
    return success(res, { ...user, roles, userRoles: undefined });
  } catch (err) {
    next(err);
  }
};

export { login, getMe };
