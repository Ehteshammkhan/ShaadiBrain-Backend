import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";
import { getDashboard } from "../../controllers/dashboard/index.js";

const router = express.Router();

// 🔥 Get Dashboard
router.get("/:weddingId", verifyJWT, getDashboard);

export default router;  