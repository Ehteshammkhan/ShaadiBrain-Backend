import { asyncHandler, ApiResponse } from "../../utils/index.js";
import User from "../../models/User.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email"],
  });

  return res.json(new ApiResponse(200, users, "Users fetched"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "avatar", "role"],
  });

  return res.json(new ApiResponse(200, user, "Profile fetched"));
});