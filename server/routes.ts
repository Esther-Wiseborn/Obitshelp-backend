import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email signup endpoint
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertEmailSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getEmailSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ 
          success: false, 
          message: "Email already registered for notifications" 
        });
      }

      // Create the email signup
      const emailSignup = await storage.createEmailSignup(validatedData);
      
      res.json({ 
        success: true, 
        message: "Successfully signed up for notifications",
        data: { id: emailSignup.id, email: emailSignup.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email format" 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while signing up" 
      });
    }
  });

  // Get all email signups (for admin purposes)
  app.get("/api/signups", async (req, res) => {
    try {
      const signups = await storage.getAllEmailSignups();
      res.json({ 
        success: true, 
        data: signups 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching signups" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
