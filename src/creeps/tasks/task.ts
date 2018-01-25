import COMMON from '../../common';

export abstract class Task {

    public execute(creep: Creep): void {
        this.executeTask(creep);
        if (this.isTaskFinished(creep)) {
            creep.memory[COMMON.MEMORY.CREEP.TASK] = '';
        }
    }

    protected abstract executeTask(creep: Creep): void;

    protected abstract isTaskFinished(creep: Creep): boolean;

}
