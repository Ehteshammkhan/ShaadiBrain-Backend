import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Task from "../../models/Task.js";
import Event from "../../models/Event.js";
import WeddingMember from "../../models/WeddingMember.js";

export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, deadline, assignedTo, status } = req.body;

  const task = await Task.findByPk(taskId, {
    include: {
      model: Event,
      attributes: ["id", "weddingId"],
    },
  });

  if (!task) throw new ApiError(404, "Task not found");

  const member = await WeddingMember.findOne({
    where: {
      weddingId: task.Event.weddingId,
      userId: req.user.id,
    },
  });

  if (!member) {
    throw new ApiError(403, "Not part of this wedding");
  }

  if (
    task.assignedTo !== req.user.id &&
    member.role !== "admin"
  ) {
    throw new ApiError(403, "Not allowed");
  }

  if (
    !title &&
    !description &&
    !deadline &&
    !assignedTo &&
    !status
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.deadline = deadline ?? task.deadline;
  task.assignedTo = assignedTo ?? task.assignedTo;
  task.status = status ?? task.status;

  await task.save();

  return res.json(
    new ApiResponse(200, task, "Task updated successfully")
  );
});