import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mealPlanRoute from "./routes/mealPlanRoute.js";
import healthAgent from "./routes/healthAgent.js";
import router from "./routes/mealPlanRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/ping", ( res ) => res.send("Server is alive"));
console.log("Type of mealPlanRoute:", typeof mealPlanRoute);
console.log("Type of healthAgent:", typeof healthAgent);


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

export default router;