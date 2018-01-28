
interface LogObject {
    id: string;
    name: string;
}

interface LogObjectWithMemory {
    id: string;
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

    public static debug(object: LogObjectWithMemory, description: string): void {
        if (object.memory[Logger.MEMORY_KEY]) {
            const message = this.formatMessage(LogLevel.DEBUG, object, description);
            console.log(message);
        }
    }

    public static log(object: LogObject, description: string): void {
        const message = this.formatMessage(LogLevel.LOG, object, description);
        console.log(message);
    }

    public static error(object: LogObject, description: string): void {
        const message = this.formatMessage(LogLevel.ERROR, object, description);
        console.log(message);
        Game.notify(message, 15);
    }

    private static formatMessage(logLevel: LogLevel, object: LogObject, message: string): string {
        const objectUrl = this.buildUrl(object.id, object.name);
        return `${logLevel} ${objectUrl}: ${message}`;
    }

    private static buildUrl(id: string, text: string): string {
        const onclick = `angular.element('body').injector().get('RoomViewPendingSelector').set('${id}');`;
        const style = 'color: #428bca; cursor: pointer;';
        return `<span style="${style}" onclick="${onclick}">${text}</span>`;
    }

}
