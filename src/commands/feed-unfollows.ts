import { getFeedsByURL } from "../lib/db/queries/feeds.js";
import { feedUnfollow } from "../lib/db/queries/feed-unfollows.js";
import { User } from "../lib/db/schema.js"


export async function handlerUnfollowing(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const feed = await getFeedsByURL(args[0]);
    if (!feed) {
        throw new Error("Couldn't fetch feed.");
    }

    const feedData = await getFeedsByURL(feed.url)
    const result = await feedUnfollow(user.id, feed.id)
    console.log(`Unfollowed:\n* Feed: ${feedData.name}\n* As User: ${user.name}`)
}