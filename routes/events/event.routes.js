import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";
import {
  createEvent,
  getEventsByWedding,
} from "../../controllers/events/index.js";

const router = express.Router();

router.post("/create", verifyJWT, createEvent);
router.get("/:weddingId", verifyJWT, getEventsByWedding);

export default router;