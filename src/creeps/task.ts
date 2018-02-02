import { MEMORY } from '../enums/memory';
import { Logger } from '../logging/logger';

export abstract class Task<T> {

    public initialize(creep: Creep): void {
        const targetId = this.findTargetId(creep);
        if (!targetId) {
            Logger.error(creep.room.name, 'No target found for', creep);
        }
        creep.memory[MEMORY.TARGET] = targetId;
    }

    public execute(creep: Creep): void {
        const targetId = creep.memory[MEMORY.TARGET];
        const target = this.getTarget(targetId);
        this.executeTask(creep, target);
        if (this.isTaskFinished(creep, target)) {
            Logger.debug(creep.memory[MEMORY.DEBUG], creep, '- Task finished');
            creep.memory[MEMORY.TASK] = '';
            creep.memory[MEMORY.TARGET] = '';
        }
    }

    protected abstract findTargetId(creep: Creep): string;

    protected getTarget(id: string): T {
        return Game.getObjectById(id) as T;
    }
    protected abstract executeTask(creep: Creep, target: T): void;

    protected abstract isTaskFinished(creep: Creep, target: T): boolean;

}
