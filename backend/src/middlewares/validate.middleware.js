import { validationResult } from "express-validator";
import { error } from "../utils/apiResponse.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return error(res, firstError.msg, 422);
  }

  next();
};
