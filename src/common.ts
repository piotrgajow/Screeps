import { UpgradeController } from './creeps/tasks/upgrade-controller';
import { Task } from './creeps/tasks/task';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { ExtractEnergy } from './creeps/tasks/extract-energy';

class CommonData {

    TASKS: { [s: string]: Task; } = {
        'upgrade-controller': new UpgradeController(),
        'fill-spawn': new FillSpawn(),
        'extract-energy': new ExtractEnergy(),
    };

    MAIN_SPAWN = Game.spawns['Spawn1'];

    MEMORY = {
        CREEP: {
            TASK: 'task',
            ROLE: 'role',
        },
    };

    constructor() {
        console.log('creating common data');
    }

}

const COMMON = new CommonData();

export default COMMON;



