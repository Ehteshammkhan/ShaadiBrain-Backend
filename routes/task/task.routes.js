import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";
import {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getMyTasks,
} from "../../controllers/task/index.js";

const router = express.Router();

router.post("/create", verifyJWT, createTask);
router.put("/update/:taskId", verifyJWT, updateTask);
router.patch("/status/:taskId", verifyJWT, updateTaskStatus);
router.delete("/delete/:taskId", verifyJWT, deleteTask);
router.get("/my", verifyJWT, getMyTasks);

export default router;