import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http.codes.js";
import { HttpError } from "../utils/HttpError.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      
      next();
    } catch (error) {
      console.error(error);
      res.status(UNAUTHORIZED).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(UNAUTHORIZED).json({ message: "Not authorized, no token" });
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(FORBIDDEN);
    throw new Error("Access denied. Admins only.");
  }
};

// Middleware to authorize based on user roles
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new HttpError("Not authorized", FORBIDDEN));
    }
    next(); // Proceed to the next middleware or route handler
  };
};

export { protect, authorizeRoles };
