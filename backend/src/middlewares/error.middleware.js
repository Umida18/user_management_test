import { error } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "P2025") {
    return error(res, "Ma'lumot topilmadi.", 404);
  }

  if (err.code === "P2002") {
    return error(res, "Bunday foydalanuvchi avvaldan mavjud.", 409);
  }

  error(res, err.message || "Server xatosi yuz berdi.", err.statusCode || 500);
};

export default errorHandler;
