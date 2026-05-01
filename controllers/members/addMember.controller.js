import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Wedding from "../../models/Wedding.js";
import WeddingMember from "../../models/WeddingMember.js";

export const addMember = asyncHandler(async (req, res) => {
  const { weddingId, userId, role } = req.body;

  if (!weddingId || !userId) {
    throw new ApiError(400, "WeddingId and UserId required");
  }

  const wedding = await Wedding.findOne({
    where: { id: weddingId, createdBy: req.user.id },
  });

  if (!wedding) {
    throw new ApiError(403, "Unauthorized");
  }

  const existing = await WeddingMember.findOne({
    where: { weddingId, userId },
  });

  if (existing) {
    throw new ApiError(400, "User already added");
  }

  const member = await WeddingMember.create({
    weddingId,
    userId,
    role: role || "member",
  });

  return res.json(new ApiResponse(201, member, "Member added"));
});