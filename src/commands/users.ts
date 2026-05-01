import { createUser, getUserByName, resetUsers, getTableUsers } from 'src/lib/db/queries/users.js';
import { setUser } from '../config.js'

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Username expected as argument.");
    }
    const existing = await getUserByName(args[0]);
    if (!existing) {
        throw new Error("This user does not exist!");
    }
    setUser(args[0])
    console.log("User has been set.")
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Username expected as argument.");
    }
    const existing = await getUserByName(args[0]);
    if (existing) {
        throw new Error("This user already exists!");
    }
    const result = await createUser(args[0])
    setUser(args[0])
    console.log(result)
    console.log("User has been created.")
}

export async function handlerReset(cmdName: string) {
    try {
        await resetUsers();
        console.log("User table reset successful.")
    }
    catch (err) {
    if (err instanceof Error) {
      console.error(`Reset failed: ${err.message}`);
    } else {
      console.error("Reset failed.");
    }
    process.exit(1);
  }
}

export async function handlerGetUsers(cmdName: string) {
    const result = await getTableUsers();
    console.log(result);
}