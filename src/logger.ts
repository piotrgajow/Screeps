import { LogObject } from './logging/log-object';

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

    public static error(...logObjects: Array<string | LogObject>): void {
        Logger.printLog(LogLevel.ERROR, logObjects);
        // this.sendNotification(logObjects); // TODO
        // Game.notify(message, 15);
    }

    private static printLog(logLevel: LogLevel, logObjects: Array<string | LogObject>): void {
        const message = Logger.buildMessage(logObjects);
        console.log(`${logLevel} ${message}`);
    }

    private static buildMessage(logObjects: Array<string | LogObject>): string {
        return logObjects.map(Logger.toString).join(' ');
    }

    private static toString(logObject: string | LogObject): string {
        if (typeof logObject === 'string') {
            return logObject;
        } else {
            return Logger.buildUrl(logObject);
        }
    }

    private static buildUrl(logObject: LogObject): string {
        const onclick = `angular.element('body').injector().get('RoomViewPendingSelector').set('${logObject.id}');`;
        const style = 'color: #428bca; cursor: pointer;';
        return `<span style="${style}" onclick="${onclick}">${logObject.name}</span>`;
    }

}
