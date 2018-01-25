import { UpgradeController } from './creeps/tasks/upgrade-controller';
import { Task } from './creeps/tasks/task';
import { FillSpawn } from './creeps/tasks/fill-spawn';

class CommonData {

    TASKS: { [s: string]: Task; } = {
        'upgrade-controller': new UpgradeController(),
        'fill-spawn': new FillSpawn(),
    };

    MAIN_SPAWN = Game.spawns['Spawn1'];

    constructor() {
        console.log('creating common data');
    }

}

const COMMON = new CommonData();

export default COMMON;



