import { readConfig } from "../config.js";
import { createFeed } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema.js"

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const name = args[0];
    const url = args[1];

    const config = readConfig();
    const currentUser = config.currentUserName;
    if (!currentUser) {
        throw new Error("Failed to get current user.");
    }
    const currentUserObject = await getUserByName(currentUser);
    if (!currentUserObject) {
        throw new Error("Failed to get current user id.");
    }
    const createdFeedResult = await createFeed(name, url, currentUserObject.id)
    printFeed(createdFeedResult, currentUserObject)
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* Feed Name:     ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}