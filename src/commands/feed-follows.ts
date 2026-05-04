import { getFeedsByURL } from "../lib/db/queries/feeds.js";
import { createFeedFollow, getFeedFollowsForUser } from "../lib/db/queries/feed-follows.js";
import { User } from "../lib/db/schema.js"

export async function handlerFeedFollows(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const feed = await getFeedsByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't fetch feed.");
    }
    const result = await createFeedFollow(user.id, feed.id)
    console.log(`Started following:\n* Feed: ${result.feedName}\n* As User: ${result.userName}`)
}

export async function handlerFollowing(cmdName: string, user: User) {

    const result = await getFeedFollowsForUser(user.id)
    for (const name of result) {
        console.log(name.feedName)
    }
}