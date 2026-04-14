import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

export const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  email = email.toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userData } = user.toJSON();

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully"));
});