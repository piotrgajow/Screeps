
import { MAIN_SPAWN } from '../constants';

import * as ExtractEnergy from '../extract-energy';
import * as FillSpawn from '../fill-spawn';
import * as UpgradeController from '../upgrade-controller';

const MEMORY = {
    ROLE: 'role',
    TASK: 'task',
};

export class CreepRole {

    constructor(
        private creep: Creep,
    ) {
    }

    get currentTask(): string {
        return this.creep.memory[MEMORY.TASK];
    }

    set currentTask(newTask: string) {
        this.creep.memory[MEMORY.TASK] = newTask;
    }

    public work(): void {
        const role = this.creep.memory[MEMORY.ROLE];
        if (role === 'harvester') {
            const task = this.getTaskToExecute();
            switch (task) {
                case 'extract-energy':
                    ExtractEnergy.execute(this.creep);
                    break;
                case 'fill-spawn':
                    FillSpawn.execute(this.creep);
                    break;
                case 'upgrade-controller':
                    UpgradeController.execute(this.creep);
                    break;
                default:
                    console.log(`Behaviour for task ${task} is undefined`);
            }
        } else if (role) {
            console.error(`${this.creep.name} has unsupported role ${role}`);
        } else {
            console.error(`${this.creep.name} has no role assigned!`);
        }

    }

    private getTaskToExecute(): string {
        let task = this.currentTask;
        if (!task) {
            task = this.findNewTask();
            this.currentTask = task;
        }
        return task;
    }

    private findNewTask(): string {
        if (this.creep.carry.energy === this.creep.carryCapacity) {
            if (Game.spawns[MAIN_SPAWN].energy === Game.spawns[MAIN_SPAWN].energyCapacity) {
                return 'upgrade-controller';
            } else {
                return 'fill-spawn';
            }
        } else {
            return 'extract-energy';
        }
    }

}
