import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email kiritilishi shart")
    .isEmail()
    .withMessage("Email noto'g'ri formatda"),

  body("password").notEmpty().withMessage("Parol kiritilishi shart"),
];
