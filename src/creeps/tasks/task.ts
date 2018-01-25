
export abstract class Task {
    readonly MEMORY_KEY = 'task';

    public execute(creep: Creep): void {
        this.executeTask(creep);
        if (this.isTaskFinished(creep)) {
            creep.memory[this.MEMORY_KEY] = '';
        }
    }

    protected abstract executeTask(creep: Creep): void;

    protected abstract isTaskFinished(creep: Creep): boolean;

}
