import express from "express";
import { enrollSimulation, getUserEnrollments } from "../controllers/enrollmentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, enrollSimulation);   
router.get("/", requireAuth, getUserEnrollments);  

export default router;
