import { error } from "../utils/apiResponse.js";

const checkRole = (...requiredRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return error(res, "Ruxsat yo'q.", 403);
    }

    const userRoles = req.user.roles;
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      return error(res, "Bu sahifaga kirish uchun ruxsatingiz yo'q.", 403);
    }

    next();
  };
};

export { checkRole };
