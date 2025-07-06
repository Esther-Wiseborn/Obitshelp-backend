import { users, emailSignups, type User, type InsertUser, type EmailSignup, type InsertEmailSignup } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSignup(emailSignup: InsertEmailSignup): Promise<EmailSignup>;
  getEmailSignupByEmail(email: string): Promise<EmailSignup | undefined>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createEmailSignup(insertEmailSignup: InsertEmailSignup): Promise<EmailSignup> {
    const [emailSignup] = await db
      .insert(emailSignups)
      .values(insertEmailSignup)
      .returning();
    return emailSignup;
  }

  async getEmailSignupByEmail(email: string): Promise<EmailSignup | undefined> {
    const [emailSignup] = await db.select().from(emailSignups).where(eq(emailSignups.email, email));
    return emailSignup || undefined;
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return await db.select().from(emailSignups);
  }
}

export const storage = new DatabaseStorage();
