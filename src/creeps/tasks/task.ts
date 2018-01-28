import { Logger } from '../../logging/logger';
import { MEMORY } from '../../memory';

export abstract class Task {

    public execute(creep: Creep): void {
        const result = this.executeTask(creep);
        if (this.isTaskFinished(creep, result)) {
            Logger.debug(creep.memory[MEMORY.DEBUG], creep, '- Task finished');
            creep.memory[MEMORY.TASK] = '';
            creep.memory[MEMORY.TARGET] = '';
        }
    }

    public abstract initialize(creep: Creep): void;

    protected abstract executeTask(creep: Creep): any;

    protected abstract isTaskFinished(creep: Creep, opts: any): boolean;

}
