import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Mugix API is running" });
});

async function startServer() {
  let port = Number(process.env.PORT) || 5000;
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port);
        server.on("listening", () => resolve(server));
        server.on("error", (err) => reject(err));
      });

      console.log(`Server running on http://localhost:${port}`);
      return;
    } catch (err) {
      if (err && err.code === "EADDRINUSE") {
        console.warn(`Port ${port} in use, trying ${port + 1}...`);
        port += 1;
        continue;
      }
      console.error(err);
      process.exit(1);
    }
  }

  console.error(`Failed to bind server after ${maxAttempts} attempts.`);
  process.exit(1);
}

startServer();
