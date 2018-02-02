import { Task } from '../task';

export class NoOp extends Task<void> {

    protected findTargetId(creep: Creep): string {
        return 'no-target';
    }

    protected getTarget(id: string): void {
        return;
    }

    protected executeTask(creep: Creep): any {
        return;
    }

    protected isTaskFinished(creep: Creep): boolean {
        return true;
    }

}
