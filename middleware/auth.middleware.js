import { asyncHandler, ApiError } from "../utils/index.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  req.user = user;
  next();
});

export default verifyJWT;