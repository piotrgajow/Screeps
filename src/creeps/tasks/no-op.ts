import { Task } from './task';

export class NoOp extends Task {

    public initialize(creep: Creep): void {
        return;
    }

    protected executeTask(creep: Creep): any {
        return;
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return true;
    }

}
