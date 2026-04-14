import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Expense from "../../models/Expense.js";

export const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  await expense.destroy();

  return res.json(
    new ApiResponse(200, null, "Expense deleted successfully")
  );
});