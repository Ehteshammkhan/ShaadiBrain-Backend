import Expense from "../../models/Expense.js";
import User from "../../models/User.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

// ✅ Add Expense
export const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, eventId } = req.body;

  if (!title || !amount || !eventId) {
    throw new ApiError(400, "Missing fields");
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
    eventId,
    userId: req.user.id,
  });

  return res.json(
    new ApiResponse(201, expense, "Expense added successfully")
  );
});

// ✅ Get Expenses
export const getExpenses = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    throw new ApiError(400, "Event ID is required");
  }

  const expenses = await Expense.findAll({
    where: { eventId },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });

  return res.json(
    new ApiResponse(200, expenses, "Expenses fetched successfully")
  );
});