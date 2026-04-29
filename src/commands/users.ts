import { setUser } from '../config.js'

function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Username expected as argument.");
    }
    setUser(args[0])
    console.log("User has been set.")
}