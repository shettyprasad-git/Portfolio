import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDatabase } from "./lib/database.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import noteRoutes from "./routes/notes.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

const dbState = await connectDatabase();
app.locals.useMemory = dbState.useMemory;

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    storage: dbState.useMemory ? "memory" : "mongodb",
    ai: process.env.HF_API_TOKEN ? "huggingface" : "fallback",
    frontend: allowedOrigins
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong"
  });
});

app.listen(port, () => {
  console.log(`FlowPilot API running on http://localhost:${port}`);
});
