import express from "express";
import verifyJWT from "../../middleware/auth.middleware.js";

import {
  getWeddingMembers,
  addMember,
  removeMember,
  updateMemberRole,
} from "../../controllers/members/index.js";

const router = express.Router();

router.get("/:weddingId", verifyJWT, getWeddingMembers);

router.post("/add", verifyJWT, addMember);
router.post("/remove", verifyJWT, removeMember);
router.post("/update-role", verifyJWT, updateMemberRole);

export default router;