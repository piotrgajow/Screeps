import COMMON from '../common';

export abstract class CreepRole {

    public creep: Creep;

    public work(): void {
        const task = this.getTaskToExecute();
        COMMON.TASKS[task].execute(this.creep);
    }

    private getTaskToExecute(): string {
        let task = this.creep.memory[COMMON.MEMORY.CREEP.TASK];
        if (!task) {
            task = this.findNewTask();
            this.creep.memory[COMMON.MEMORY.CREEP.TASK] = task;
        }
        return task;
    }

    protected abstract findNewTask(): string;

}
