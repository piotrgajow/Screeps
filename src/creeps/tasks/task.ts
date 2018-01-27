import COMMON from '../../common';
import { Logger } from '../../logger';

export abstract class Task {

    public execute(creep: Creep): void {
        const result = this.executeTask(creep);
        if (this.isTaskFinished(creep, result)) {
            Logger.debug(creep, 'Task finished');
            creep.memory[COMMON.MEMORY.CREEP.TASK] = '';
        }
    }

    protected abstract executeTask(creep: Creep): any;

    protected abstract isTaskFinished(creep: Creep, opts: any): boolean;

}
