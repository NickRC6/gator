import { readConfig } from "./config.js";
import { CommandHandler } from "./commands/commands";
import { User } from "./lib/db/schema";
import { getUserByName } from "./lib/db/queries/users";

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export const middlewareLoggedIn = (handler: UserCommandHandler): CommandHandler => {
  return async (cmdName, ...args) => {
    const config = readConfig();
    const currentUser = config.currentUserName;
    if (!currentUser) {
        throw new Error("Failed to get current user.");
    }
    const user = await getUserByName(currentUser);
    if (!user) {
        throw new Error("Failed to get current user.");
    }

    return handler(cmdName, user, ...args);
  };
};