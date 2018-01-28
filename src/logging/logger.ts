import { LogObject } from './log-object';

enum LogLevel {
    DEBUG = '[DEBUG]',
    LOG = '[LOG]',
    ERROR = '[ERROR]',
}

export class Logger {

    public static debug(logFlag: boolean, ...logObjects: Array<string | LogObject>): void {
        if (logFlag) {
            Logger.printLog(LogLevel.DEBUG, logObjects);
        }
    }

    public static log(...logObjects: Array<string | LogObject>): void {
        Logger.printLog(LogLevel.LOG, logObjects);
    }

    public static error(roomName: string, ...logObjects: Array<string | LogObject>): void {
        Logger.printLog(LogLevel.ERROR, logObjects);
        Logger.sendNotification(roomName, logObjects);
    }

    private static printLog(logLevel: LogLevel, logObjects: Array<string | LogObject>): void {
        const message = Logger.buildMessage(logObjects, Logger.urlLogObjectFormatter);
        console.log(`${logLevel} ${message}`);
    }

    private static buildMessage(logObjects: Array<string | LogObject>, formatter: (a: LogObject) => string): string {
        return logObjects.map((it) => {
            if (typeof it === 'string') {
                return it;
            } else {
                return formatter(it);
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

    private static sendNotification(room: string, logObjects: Array<string | LogObject>): void {
        const error = Logger.buildMessage(logObjects, Logger.simpleLogObjectFormatter);
        const shard = Game.shard;
        const url = `https://screeps.com/a/#!/history/${shard}/${room}?t=${Game.time}`;
        const message = `<a href="${url}">Error occurred: ${error}</a>a>`;
        Game.notify(message, 15);
    }

}
