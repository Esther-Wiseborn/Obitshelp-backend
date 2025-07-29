import cors from "cors";
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Enable CORS
app.use(cors());

// Handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function startServer() {
  try {
    // Register all API routes
    const server = await registerRoutes(app);

    // Serve static files or Vite in dev
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT || "5000");
    server.listen({ port, host: "0.0.0.0" }, () => {
      log(`Backend server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

startServer();
