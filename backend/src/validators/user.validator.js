import { body } from "express-validator";

const createUserValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Ism kiritilishi shart")
    .isLength({ min: 2, max: 50 })
    .withMessage("Ism 2-50 ta belgidan iborat bo'lishi kerak")
    .matches(/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ]+$/)
    .withMessage("Ism faqat harflardan iborat bo'lishi kerak"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Familiya kiritilishi shart")
    .isLength({ min: 2, max: 50 })
    .withMessage("Familiya 2-50 ta belgidan iborat bo'lishi kerak")
    .matches(/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ]+$/)
    .withMessage("Familiya faqat harflardan iborat bo'lishi kerak"),

  body("email")
    .trim()
    .notEmpty()
    .normalizeEmail()
    .withMessage("Email kiritilishi shart")
    .isEmail()
    .withMessage("Email noto'g'ri formatda"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Parol kiritilishi shart")
    .isLength({ min: 8 })
    .withMessage("Parol kamida 8 ta belgidan iborat bo'lishi kerak")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Parolda kamida 1 ta katta harf va 1 ta maxsus belgi bo'lishi kerak",
    ),
];

const updateUserValidator = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Ism 2-50 ta belgidan iborat bo'lishi kerak")
    .matches(/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ]+$/)
    .withMessage("Ism faqat harflardan iborat bo'lishi kerak"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Familiya 2-50 ta belgidan iborat bo'lishi kerak")
    .matches(/^[A-Za-zА-Яа-яЎўҚқҒғҲҳ]+$/)
    .withMessage("Familiya faqat harflardan iborat bo'lishi kerak"),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email noto'g'ri formatda"),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Parol kamida 8 ta belgidan iborat bo'lishi kerak.")
    .matches(/[A-Z]/)
    .withMessage("Parolda kamida 1 ta katta harf (A-Z) bo'lishi kerak.")
    .matches(/[!#.@$%^&*]/)
    .withMessage(
      "Parolda kamida 1 ta maxsus belgi (!, #, ., ..) bo'lishi kerak.",
    ),
];

const assignRolesValidator = [
  body("roleIds")
    .isArray({ min: 1 })
    .withMessage("Kamida bitta rol tanlanishi kerak.")
    .custom((roleIds) => roleIds.every((id) => Number.isInteger(id)))
    .withMessage("Rol ID'lari butun son bo'lishi kerak."),
];

export { createUserValidator, updateUserValidator, assignRolesValidator };
