import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../../controllers/expenses/index.js";

const router = express.Router();

router.post("/add", verifyJWT, addExpense);
router.get("/:eventId", verifyJWT, getExpenses);
router.put("/update/:expenseId", verifyJWT, updateExpense);
router.delete("/delete/:expenseId", verifyJWT, deleteExpense);

export default router;