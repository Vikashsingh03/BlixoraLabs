import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    simulation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Simulation",
      required: true,
    },
    status: {
      type: String,
      enum: ["Enrolled", "In Progress", "Completed"],
      default: "Enrolled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
