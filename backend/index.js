import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import enrollmentRoutes from "./routes/enrollmentRoutes.js";







dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin:["https://blixoralabs-frontend.onrender.com","http://localhost:5173"]
  credentials: true, 
}));


app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/enrollments", enrollmentRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/simulations", simulationRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Blixora Backend");
});


app.listen(port, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${port}`);
});
