import { db } from "..";
import { feedFollows } from "../schema";
import { eq, and } from "drizzle-orm";

export async function feedUnfollow(userId: string, feedId: string) {
    const unfollowFeed = await db.delete(feedFollows)
        .where(
            and(
                eq(feedFollows.userId, userId),
                eq(feedFollows.feedId, feedId)
            )
        )
        .returning();

    return unfollowFeed;
}