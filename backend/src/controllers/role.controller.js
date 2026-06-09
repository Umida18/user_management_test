import prisma from "../config/prisma.js";
import { success } from "../utils/apiResponse.js";

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" },
    });

    return success(res, roles);
  } catch (err) {
    next(err);
  }
};

export { getAllRoles };
