
interface NamedObject {
    name: string;
}

interface NamedObjectWithMemory {
    name: string;
    memory: object;
}

enum LogLevel {
    DEBUG = '[DEBUG]',
    LOG = '[LOG]',
    ERROR = '[ERROR]',
}

export class Logger {

    private static MEMORY_KEY = 'debug';

    public static debug(object: NamedObjectWithMemory, description: string): void {
        if (object.memory[Logger.MEMORY_KEY]) {
            const message = this.formatMessage(LogLevel.DEBUG, object, description);
            console.log(message);
        }
    }

    public static log(object: NamedObject, description: string): void {
        const message = this.formatMessage(LogLevel.LOG, object, description);
        console.log(message);
    }

    public static error(object: NamedObject, description: string): void {
        const message = this.formatMessage(LogLevel.ERROR, object, description);
        console.error(message);
        Game.notify(message, 15);
    }

    private static formatMessage(logLevel: LogLevel, object: NamedObject, message: string): string {
        return `${logLevel} ${object.name}: ${message}`;
    }

}
