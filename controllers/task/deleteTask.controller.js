import Task from "../../models/Task.js";
import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByPk(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  // 🔐 Permission check
  if (task.assignedTo !== req.user.id) {
    throw new ApiError(403, "Not allowed");
  }

  await task.destroy();

  return res.json(
    new ApiResponse(200, null, "Task deleted successfully")
  );
});