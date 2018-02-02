import { LogObject } from './log-object';

enum LogLevel {
    DEBUG = 'DEBUG',
    LOG = 'LOG',
    ERROR = 'ERROR',
}

type LogEntity = string | LogObject | null | undefined | number | boolean;

function isLogObject(a: string | LogObject | number | boolean): a is LogObject {
    return (a as LogObject).id !== undefined && (a as LogObject).name !== undefined;
}

export class Logger {

    public static debug(logFlag: boolean, ...logObjects: LogEntity[]): void {
        if (logFlag) {
            Logger.printLog(LogLevel.DEBUG, logObjects);
        }
    }

    public static log(...logObjects: LogEntity[]): void {
        Logger.printLog(LogLevel.LOG, logObjects);
    }

    public static error(roomName: string, ...logObjects: LogEntity[]): void {
        Logger.printLog(LogLevel.ERROR, logObjects);
        Logger.sendNotification(roomName, logObjects);
    }

    private static printLog(logLevel: LogLevel, logObjects: LogEntity[]): void {
        const message = Logger.buildMessage(logObjects, Logger.urlLogObjectFormatter);
        console.log(`[${Game.time}][${logLevel}] ${message}`);
    }

    private static buildMessage(logObjects: LogEntity[], formatter: (a: LogObject) => string): string {
        return logObjects.map((it) => {
            if (it === null || it === undefined) {
                return 'null';
            } else if (isLogObject(it)) {
                return formatter(it);
            } else {
                return it;
            }
        }).join(' ');
    }

    private static urlLogObjectFormatter(logObject: LogObject): string {
        const onclick = `angular.element('body').injector().get('RoomViewPendingSelector').set('${logObject.id}');`;
        const style = 'color: #428bca; cursor: pointer;';
        return `<span style="${style}" onclick="${onclick}">${logObject.name}</span>`;
    }

    private static simpleLogObjectFormatter(logObject: LogObject): string {
        return `${logObject.name} [${logObject.id}]`;
    }

    private static sendNotification(room: string, logObjects: LogEntity[]): void {
        const error = Logger.buildMessage(logObjects, Logger.simpleLogObjectFormatter);
        const shard = Game.shard;
        const url = `https://screeps.com/a/#!/history/${shard.name}/${room}?t=${Game.time}`;
        const message = `<a href="${url}">[${Game.time}] Error occurred: ${error}</a>`;
        Game.notify(message, 15);
    }

}
