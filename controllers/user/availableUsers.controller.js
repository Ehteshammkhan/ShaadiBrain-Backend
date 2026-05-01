import { ApiResponse, ApiError, asyncHandler } from "../../utils/index.js";
import User from "../../models/User.js";
import WeddingMember from "../../models/WeddingMember.js";
import { Op } from "sequelize";
export const getAvailableUsers = asyncHandler(async (req, res) => {
  const { weddingId } = req.query;

  if (!weddingId) {
    throw new ApiError(400, "WeddingId required");
  }

  const members = await WeddingMember.findAll({
    where: { weddingId },
    attributes: ["userId"],
  });

  const memberIds = members.map(m => m.userId);

  const users = await User.findAll({
    where: {
      id: {
        [Op.notIn]: memberIds,
      },
    },
    attributes: ["id", "name", "email"],
  });

  return res.json(new ApiResponse(200, users, "Available users"));
});