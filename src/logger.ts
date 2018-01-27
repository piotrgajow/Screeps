
export class Logger {

    private static MEMORY_KEY = 'debug';

    public static debug(creep: Creep, message: string): void {
        if (creep.memory[Logger.MEMORY_KEY]) {
            console.log(`[DEBUG] ${creep.name}: ${message}`);
        }
    }

}
