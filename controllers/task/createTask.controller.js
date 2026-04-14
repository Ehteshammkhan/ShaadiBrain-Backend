import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Task from "../../models/Task.js";
import User from "../../models/User.js";
import Event from "../../models/Event.js";

// ✅ Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, eventId, assignedTo, deadline } = req.body;

  if (!title || !eventId || !assignedTo) {
    throw new ApiError(400, "Title, Event and Assigned User are required");
  }

  const event = await Event.findByPk(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const user = await User.findByPk(assignedTo);
  if (!user) throw new ApiError(404, "Assigned user not found");

  const task = await Task.create({
    title,
    description,
    eventId,
    assignedTo,
    deadline,
    status: "pending",
  });

  return res.status(201).json(
    new ApiResponse(201, task, "Task created successfully")
  );
});

// ✅ Update Task Status
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["pending", "in_progress", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const task = await Task.findByPk(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  // 🔐 Permission check
  if (task.assignedTo !== req.user.id) {
    throw new ApiError(403, "Not allowed");
  }

  task.status = status;
  await task.save();

  return res.json(
    new ApiResponse(200, task, "Task status updated")
  );
});

// ✅ Get My Tasks
export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    where: { assignedTo: req.user.id },
    order: [["createdAt", "DESC"]],
  });

  return res.json(
    new ApiResponse(200, tasks, "My tasks fetched")
  );
});

export const getTasksByEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const tasks = await Task.findAll({
    where: { eventId },
  });

  return res.json(
    new ApiResponse(200, tasks, "Tasks fetched")
  );
});