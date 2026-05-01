import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { readConfig } from "../../../config.js";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function resetUsers() {
  const [result] = await db.delete(users);
  return result;
}

export async function getTableUsers() {
  const config = readConfig();
  const currentUser = config.currentUserName;
  const result = await db.select({ name: users.name }).from(users);
  return result.map((user) => {
  if (user.name === currentUser) {
        return `* ${user.name} (current)`;
    }
    return `* ${user.name}`;
    }).join("\n");
}