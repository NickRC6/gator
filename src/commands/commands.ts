


type CommandHandler = (
    cmdName: string, 
    ...args: string[]
) => void;

type CommandsRegistry = Record<string, CommandHandler>;

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {

}