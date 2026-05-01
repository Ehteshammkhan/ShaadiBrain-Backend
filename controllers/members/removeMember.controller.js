import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Wedding from "../../models/Wedding.js";
import WeddingMember from "../../models/WeddingMember.js";

export const removeMember = asyncHandler(async (req, res) => {
  const { weddingId, userId } = req.body;

  if (!weddingId || !userId) {
    throw new ApiError(400, "WeddingId and UserId required");
  }

  // ✅ Check if user is owner OR admin
  const isOwner = await Wedding.findOne({
    where: { id: weddingId, createdBy: req.user.id },
  });

  const isAdmin = await WeddingMember.findOne({
    where: {
      weddingId,
      userId: req.user.id,
      role: "admin",
    },
  });

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Only admin can remove members");
  }

  const member = await WeddingMember.findOne({
    where: { weddingId, userId },
  });

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  await member.destroy();

  return res.json(new ApiResponse(200, null, "Member removed"));
});