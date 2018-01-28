import COMMON from '../common';
import { Logger } from '../logger';
import { MEMORY } from '../memory';

export abstract class CreepRole {

    public creep: Creep;

    public work(): void {
        const task = this.getTaskToExecute();
        Logger.debug(this.creep, `Working on task '${task}' with target '${this.creep.memory[MEMORY.TARGET]}'`);
        COMMON.TASKS[task].execute(this.creep);
    }

    private getTaskToExecute(): string {
        let task = this.creep.memory[MEMORY.TASK];
        if (!task) {
            task = this.findNewTask();
            Logger.debug(this.creep, `New task '${task}' assigned`);
            this.creep.memory[MEMORY.TASK] = task;
            COMMON.TASKS[task].initialize(this.creep);
        }
        return task;
    }

    protected abstract findNewTask(): string;

}
