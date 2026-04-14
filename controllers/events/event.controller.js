import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import Event from "../../models/Event.js";
import Wedding from "../../models/Wedding.js";

export const createEvent = asyncHandler(async (req, res) => {
  const { name, budget, weddingId } = req.body;

  if (!name || !weddingId) {
    throw new ApiError(400, "Name and Wedding ID are required");
  }

  if (!name.trim()) {
    throw new ApiError(400, "Event name cannot be empty");
  }

  if (budget && (isNaN(budget) || budget < 0)) {
    throw new ApiError(400, "Invalid budget amount");
  }

  // 🔐 Ownership check
  const wedding = await Wedding.findOne({
    where: { id: weddingId, userId: req.user.id },
  });

  if (!wedding) {
    throw new ApiError(403, "Unauthorized to add event");
  }

  const event = await Event.create({
    name,
    budget: budget || 0,
    weddingId,
  });

  return res.status(201).json(
    new ApiResponse(201, event, "Event created successfully")
  );
});


export const getEventsByWedding = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;

  const events = await Event.findAll({
    where: { weddingId },
    order: [["createdAt", "ASC"]],
  });

  return res.json(
    new ApiResponse(200, events, "Events fetched successfully")
  );
});