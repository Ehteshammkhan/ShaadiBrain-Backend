import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import WeddingMember from "../../models/WeddingMember.js";
import User from "../../models/User.js";

export const getWeddingMembers = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;

  const member = await WeddingMember.findOne({
    where: {
      weddingId,
      userId: req.user.id,
    },
  });

  if (!member) {
    throw new ApiError(403, "Not allowed");
  }

  const members = await WeddingMember.findAll({
    where: { weddingId },
    include: [
      {
        model: User,
        as: "User", // ✅ MUST MATCH association
        attributes: ["id", "name", "email"],
      },
    ],
  });

  return res.json(new ApiResponse(200, members, "Members fetched"));
});