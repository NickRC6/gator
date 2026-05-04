import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow (userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId: userId, feedId: feedId}).returning();
    const [result] = await db.select({
    id: feedFollows.id,
    feedName: feeds.name,
    userName: users.name,
    createdAt: feedFollows.createdAt, 
    updatedAt: feedFollows.updatedAt,
    userId: feedFollows.userId,
    feedId: feedFollows.feedId,
}).from(feedFollows).innerJoin(feeds, eq(feedFollows.feedId, feeds.id)).innerJoin(users, eq(feedFollows.userId, users.id)).where(eq(feedFollows.id, newFeedFollow.id))
    return result;
}

export async function getFeedFollowsForUser(userId: string) {
    const feedFetch = await db.select({
        id: feedFollows.id,
        feedName: feeds.name,
        userName: users.name,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
    }).from(feedFollows).innerJoin(users, eq(feedFollows.userId, users.id)).innerJoin(feeds, eq(feedFollows.feedId, feeds.id)).where(eq(feedFollows.userId, userId))
    return feedFetch;
}
