import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Expense from "../../models/Expense.js";

export const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const { title, amount, category } = req.body;

  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  expense.title = title || expense.title;
  expense.amount = amount || expense.amount;
  expense.category = category || expense.category;

  await expense.save();

  return res.json(
    new ApiResponse(200, expense, "Expense updated successfully")
  );
});