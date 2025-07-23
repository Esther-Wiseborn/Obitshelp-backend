import cors from "cors";
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Enable CORS for all routes
app.use(cors()); // <--- THIS is the missing line

// Handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  const server = await registerRoutes(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000");
  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`serving on port ${port}`);
  });
})();
