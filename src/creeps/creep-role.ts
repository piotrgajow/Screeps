import COMMON from '../common';
import { Logger } from './logger';

export abstract class CreepRole {

    public creep: Creep;

    public work(): void {
        const task = this.getTaskToExecute();
        Logger.debug(this.creep, `Working on task '${task}'`);
        COMMON.TASKS[task].execute(this.creep);
    }

    private getTaskToExecute(): string {
        let task = this.creep.memory[COMMON.MEMORY.CREEP.TASK];
        if (!task) {
            task = this.findNewTask();
            Logger.debug(this.creep, `New task '${task}' assigned`);
            this.creep.memory[COMMON.MEMORY.CREEP.TASK] = task;
        }
        return task;
    }

    protected abstract findNewTask(): string;

}
