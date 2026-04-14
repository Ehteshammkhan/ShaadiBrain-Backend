import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";
import {
  createWedding,
  getMyWeddings,
} from "../../controllers/wedding/index.js";

const router = express.Router();

router.post("/create", verifyJWT, createWedding);
router.get("/my", verifyJWT, getMyWeddings);

export default router;