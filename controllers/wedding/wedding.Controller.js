import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Wedding from "../../models/Wedding.js";
import WeddingMember from "../../models/WeddingMember.js";

export const createWedding = asyncHandler(async (req, res) => {
  const { title, date } = req.body;

  if (!title) {
    throw new ApiError(400, "Wedding title is required");
  }

  // 🔥 Create wedding
  const wedding = await Wedding.create({
    title,
    date,
    createdBy: req.user.id,
  });

  // 🔥 Add creator as admin
  await WeddingMember.create({
    userId: req.user.id,
    weddingId: wedding.id,
    role: "admin",
  });

  return res.status(201).json(
    new ApiResponse(201, wedding, "Wedding created successfully")
  );
});