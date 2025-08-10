import express from "express";
import { getUserProfile, getAllUsers } from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js"

const router = express.Router()


router.get("/profile", requireAuth, getUserProfile);


router.get("/", requireAuth, getAllUsers);

export default router;
