import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Wedding from "../../models/Wedding.js";
import WeddingMember from "../../models/WeddingMember.js";

export const updateMemberRole = asyncHandler(async (req, res) => {
  const { weddingId, userId, role } = req.body;

  if (!weddingId || !userId || !role) {
    throw new ApiError(400, "All fields required");
  }

  const wedding = await Wedding.findOne({
    where: { id: weddingId, createdBy: req.user.id },
  });

  if (!wedding) {
    throw new ApiError(403, "Unauthorized");
  }

  const member = await WeddingMember.findOne({
    where: { weddingId, userId },
  });

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  member.role = role;
  await member.save();

  return res.json(
    new ApiResponse(200, member, "Role updated")
  );
});