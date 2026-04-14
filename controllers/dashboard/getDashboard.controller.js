import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Event from "../../models/Event.js";
import Expense from "../../models/Expense.js";
import Task from "../../models/Task.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;

  if (!weddingId) {
    throw new ApiError(400, "Wedding ID is required");
  }

  const events = await Event.findAll({
    where: { weddingId },
    include: [
      {
        model: Expense,
        attributes: ["id", "title", "amount", "category"],
      },
      {
        model: Task,
        attributes: ["id", "title", "status", "deadline"],
      },
    ],
  });

  return res.json(
    new ApiResponse(200, events, "Dashboard data fetched successfully")
  );
});