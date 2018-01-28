import { LogObject } from './logging/log-object';

enum LogLevel {
    DEBUG = '[DEBUG]',
    LOG = '[LOG]',
    ERROR = '[ERROR]',
}

export class Logger {

    public static debug(logFlag: boolean, ...logObjects: Array<string | LogObject>): void {
        if (logFlag) {
            this.printLog(LogLevel.DEBUG, logObjects);
        }
    }

    public static log(...logObjects: Array<string | LogObject>): void {
        this.printLog(LogLevel.LOG, logObjects);
    }

    public static error(...logObjects: Array<string | LogObject>): void {
        this.printLog(LogLevel.ERROR, logObjects);
        // this.sendNotification(logObjects); // TODO
        // Game.notify(message, 15);
    }

    private static printLog(logLevel: LogLevel, logObjects: Array<string | LogObject>): void {
        const message = this.buildMessage(logObjects);
        console.log(`${logLevel} ${message}`);
    }

    private static buildMessage(logObjects: Array<string | LogObject>): string {
        return logObjects.map(this.toString).join(' ');
    }

    private static toString(logObject: string | LogObject): string {
        if (typeof logObject === 'string') {
            return logObject;
        } else {
            return this.buildUrl(logObject);
        }
    }

    private static buildUrl(logObject: LogObject): string {
        const onclick = `angular.element('body').injector().get('RoomViewPendingSelector').set('${logObject.id}');`;
        const style = 'color: #428bca; cursor: pointer;';
        return `<span style="${style}" onclick="${onclick}">${logObject.name}</span>`;
    }

}
