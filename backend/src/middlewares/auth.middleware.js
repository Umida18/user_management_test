import jwt from "jsonwebtoken";
import { error } from "../utils/apiResponse.js";
import jwtConfig from "../config/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return error(res, "Token mavjud emas. Iltimos, tizimga kiring.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = decoded;

    next();
  } catch (error) {
    return error(res, "Token noto'g'ri yoki muddati tugagan.", 401);
  }
};

export default authMiddleware;
