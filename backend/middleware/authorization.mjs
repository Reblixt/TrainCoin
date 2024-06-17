import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import User from "../models/UserModel.mjs";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);

  if (!req.user) {
    return next(new ErrorResponse("No user found with this id", 404));
  }

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403,
        ),
      );
    }
    next();
  };
};
