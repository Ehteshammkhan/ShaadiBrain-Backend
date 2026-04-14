import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Task from "../../models/Task.js";

export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, deadline, assignedTo } = req.body;

  const task = await Task.findByPk(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  // 🔐 Permission check
  if (task.assignedTo !== req.user.id) {
    throw new ApiError(403, "Not allowed");
  }

  if (!title && !description && !deadline && !assignedTo) {
    throw new ApiError(400, "At least one field is required");
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.deadline = deadline || task.deadline;
  task.assignedTo = assignedTo || task.assignedTo;

  await task.save();

  return res.json(
    new ApiResponse(200, task, "Task updated successfully")
  );
});