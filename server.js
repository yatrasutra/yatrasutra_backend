import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import internationalRoutes from "./routes/internationalRoutes.js";
import domesticRoutes from "./routes/domesticRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"; 

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/international", internationalRoutes);
app.use("/api/domestic", domesticRoutes);
app.use("/api/blog", blogRoutes);

// Test route
app.get("/", (req, res) => res.send("Yatrasutra backend running 🚀"));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
  console.log(`✅ Server running at ${HOST}:${PORT}`);
});
