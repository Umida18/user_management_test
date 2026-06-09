import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { success, error } from "../utils/apiResponse.js";

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  createdAt: true,
  userRoles: {
    include: { role: true },
  },
};

const formatUser = (user) => ({
  ...user,
  roles: user.userRoles.map((ur) => ur.role),
  userRoles: undefined,
});

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: "desc" },
    });
    return success(res, users.map(formatUser));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: userSelect,
    });

    if (!user) return error(res, "Foydalanuvchi topilmadi.", 404);
    return success(res, formatUser(user));
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return error(res, "Bunday foydalanuvchi avvaldan mavjud.", 409);

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
      select: userSelect,
    });

    return success(res, formatUser(user), 201);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const id = Number(req.params.id);

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return error(res, "Foydalanuvchi topilmadi.", 404);

    if (email && email !== existing.email) {
      const emailTaken = await prisma.user.findUnique({ where: { email } });
      if (emailTaken)
        return error(res, "Bu email boshqa foydalanuvchida mavjud.", 409);
    }

    const data = {};
    if (firstName !== undefined) data.firstName = firstName;
    if (lastName !== undefined) data.lastName = lastName;
    if (email !== undefined) data.email = email;
    if (password !== undefined) data.password = await hashPassword(password);

    const user = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });

    return success(res, formatUser(user));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return error(res, "Foydalanuvchi topilmadi.", 404);

    await prisma.user.delete({ where: { id } });
    return success(res, { message: "Foydalanuvchi o'chirildi." });
  } catch (err) {
    next(err);
  }
};

const assignRoles = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { roleIds } = req.body;

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return error(res, "Foydalanuvchi topilmadi.", 404);

    const adminRole = await prisma.role.findUnique({
      where: { name: "ADMIN" },
    });
    if (adminRole && roleIds.includes(adminRole.id)) {
      return error(
        res,
        "ADMIN roli yangi foydalanuvchilarga berilishi mumkin emas.",
        403,
      );
    }

    await prisma.userRole.deleteMany({ where: { userId: id } });
    await prisma.userRole.createMany({
      data: roleIds.map((roleId) => ({ userId: id, roleId })),
    });

    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    return success(res, formatUser(user));
  } catch (err) {
    next(err);
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignRoles,
};
