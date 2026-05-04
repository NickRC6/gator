import { createFeed, getFeeds } from "../lib/db/queries/feeds.js";
import { createFeedFollow } from "../lib/db/queries/feed-follows.js";
import { Feed, User } from "../lib/db/schema.js"

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const name = args[0];
    const url = args[1];

    const createdFeedResult = await createFeed(name, url, user.id)
    const followedResult = await createFeedFollow(user.id, createdFeedResult.id)
    console.log(`Feed followed:`);
    console.log(`* Feed:  ${followedResult.feedName}`);
    console.log(`* User:  ${followedResult.userName}`);
    console.log(`* Detailed feed information below: `);
    printFeed(createdFeedResult, user)
}

export async function handlerGetFeeds(cmdName: string) {
    const result = await getFeeds();
    for (const item of result) {
        console.log(item);
    }
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* Feed Name:     ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}