import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db.insert(feeds).values({ name, url, userId }).returning();
  return result;
}

export async function getFeeds() {
  const result = await db.select().from(feeds).innerJoin(users, eq(feeds.userId, users.id));
  return result.map((object) => {
    return `-------------------\n* ${object.feeds.name}\n* ${object.feeds.url}\n* ${object.users.name}\n-------------------`;
  })
}

export async function getFeedsByURL(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result
}