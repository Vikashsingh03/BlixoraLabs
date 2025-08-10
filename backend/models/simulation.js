import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    status: { type: String, default: "Draft" },
    description: { type: String },
    duration: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Simulation", simulationSchema);
