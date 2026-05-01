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

  // ✅ 🔥 Calculate budget summary
  let totalBudget = 0;
  let totalSpent = 0;

  events.forEach((event) => {
    totalBudget += event.budget || 0;

    totalSpent += (event.Expenses || []).reduce(
      (sum, exp) => sum + (exp.amount || 0),
      0
    );
  });

  const summary = {
    totalBudget,
    totalSpent,
    remaining: totalBudget - totalSpent,
  };

  // ✅ RETURN UPDATED STRUCTURE
  return res.json(
    new ApiResponse(
      200,
      {
        events,
        summary,
      },
      "Dashboard data fetched successfully"
    )
  );
});