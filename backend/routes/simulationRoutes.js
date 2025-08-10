import express from "express";
import {
  getAllSimulations,
  createSimulation,
  updateSimulation,
  deleteSimulation,
} from "../controllers/simulationController.js"

const router = express.Router();

router.get("/", getAllSimulations);
router.post("/", createSimulation);
router.put("/:id", updateSimulation);
router.delete("/:id", deleteSimulation);

export default router;
