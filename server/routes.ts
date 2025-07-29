import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSignupSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email signup endpoint
  app.post("/api/signup", async (req, res) => {
    console.log("Form submitted:", req.body);
    try {
      const validatedData = insertEmailSignupSchema.parse(req.body);

      // Check if email already exists
      const existingSignup = await storage.getEmailSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({
          success: false,
          message: "Email already registered for notifications",
        });
      }

      // Create the email signup
      const emailSignup = await storage.createEmailSignup(validatedData);

      res.json({
        success: true,
        message: "Successfully signed up for notifications",
        data: { id: emailSignup.id, email: emailSignup.email },
      });
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      res.status(500).json({
        success: false,
        message: "An error occurred while signing up",
      });
    }
  });

  // Get all email signups (for admin purposes)
  app.get("/api/signups", async (req, res) => {
    try {
      const signups = await storage.getAllEmailSignups();
      res.json({
        success: true,
        data: signups,
      });
    } catch (error) {
      console.error("Database fetch error details:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching signups",
      });
    }
  });

  // Download endpoint for source code
  app.get("/download/source", (req, res) => {
    const filePath = path.join(process.cwd(), "obitshelp-source-code.zip");
    res.download(filePath, "obitshelp-source-code.zip", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(404).json({ error: "File not found" });
      }
    });
  });

  app.get("/api/hello", (req, res) => {
    res.json({ success: true, message: "Backend is working!" });
  });

  // Debug endpoint for database
  app.get("/api/debug-db", async (req, res) => {
    try {
      const { db } = await import("./db");
      const { emailSignups } = await import("@shared/schema");
      const result = await db.select().from(emailSignups).limit(1);
      res.json({ success: true, result });
    } catch (e) {
      console.error("DB Debug Error:", e);
      res.status(500).json({ success: false, error: String(e) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
