import COMMON from '../../common';

export abstract class Task {

    public execute(creep: Creep): void {
        const result = this.executeTask(creep);
        if (this.isTaskFinished(creep, result)) {
            creep.memory[COMMON.MEMORY.CREEP.TASK] = '';
        }
    }

    protected abstract executeTask(creep: Creep): any;

    protected abstract isTaskFinished(creep: Creep, opts: any): boolean;

}
