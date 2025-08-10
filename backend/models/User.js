import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    enrolledSimulations: [
      {
        simulation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Simulation",
        },
        status: {
          type: String,
          enum: ["Enrolled", "In Progress", "Completed"],
          default: "Enrolled",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
