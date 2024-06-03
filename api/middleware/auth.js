import { errorHandler } from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsynsError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return errorHandler(401, "Please login to continue");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    next(err);
  }
  next();
});
