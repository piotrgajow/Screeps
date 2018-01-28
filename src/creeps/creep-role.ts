import COMMON from '../common';
import { Logger } from '../logging/logger';
import { MEMORY } from '../memory';
import { LogObject } from '../logging/log-object';

export abstract class CreepRole {

    public creep: Creep;

    public work(): void {
        const task = this.getTaskToExecute();
        Logger.debug(
            this.debugFlag(),
            this.creep,
            `- Working on task '${task}' with`,
            this.logTarget()
        );
        COMMON.TASKS[task].execute(this.creep);
    }

    private getTaskToExecute(): string {
        let task = this.creep.memory[MEMORY.TASK];
        if (!task) {
            task = this.findNewTask();
            Logger.debug(this.debugFlag(), this.creep, `- New task '${task}' assigned`);
            this.creep.memory[MEMORY.TASK] = task;
            COMMON.TASKS[task].initialize(this.creep);
        }
        return task;
    }

    protected abstract findNewTask(): string;

    private debugFlag(): boolean {
        return this.creep.memory[MEMORY.DEBUG];
    }

    private logTarget(): LogObject {
        return { id: this.creep.memory[MEMORY.TARGET], name: 'target' };
    }

}
