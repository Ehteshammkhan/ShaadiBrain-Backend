import express from "express";
import { getAllUsers, getProfile } from "../../controllers/user/user.controller.js";
import { updateProfile } from "../../controllers/user/updateProfile.controller.js";
import { changePassword } from "../../controllers/user/changePassword.controller.js";
import { getAvailableUsers } from "../../controllers/user/availableUsers.controller.js";
import verifyJWT from "../../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", verifyJWT, getAllUsers);
router.get("/available", verifyJWT, getAvailableUsers);
router.get("/profile", verifyJWT, getProfile);
router.put("/update-profile", verifyJWT, updateProfile);
router.post("/change-password", verifyJWT, changePassword);
export default router;