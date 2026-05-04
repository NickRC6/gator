import { readConfig } from "../config.js";
import { getFeeds, getFeedsByURL } from "../lib/db/queries/feeds";
import { createFeedFollow, getFeedFollowsForUser } from "../lib/db/queries/feed-follows.js";
import { Feed, User, feedFollows } from "../lib/db/schema.js"
import { getUserByName } from "src/lib/db/queries/users.js";



export async function handlerFeedFollows(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }

    const config = readConfig();
    const userName = config.currentUserName;
    if (!userName) {
        throw new Error("No user is currently logged in.");
    }
    const user = await getUserByName(userName);
    const feed = await getFeedsByURL(args[0]);
    const result = await createFeedFollow(user.id, feed.id)
    console.log(`Started following:\n* Feed: ${result.feedName}\n* As User: ${result.userName}`)
}

export async function handlerFollowing(cmdName: string) {

    const config = readConfig();
    const userName = config.currentUserName;
    if (!userName) {
        throw new Error("No user is currently logged in.");
    }
    const user = await getUserByName(userName);

    const result = await getFeedFollowsForUser(user.id)
    for (const name of result) {
        console.log(name.feedName)
    }
}