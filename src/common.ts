import { CreepRole } from './creeps/creep-role';
import { Harvester } from './creeps/harvester';

import { ExtractEnergy } from './creeps/tasks/extract-energy';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { Task } from './creeps/tasks/task';
import { UpgradeController } from './creeps/tasks/upgrade-controller';

const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        harvester: Harvester.prototype,
    };

    public TASKS: { [s: string]: Task } = {
        'extract-energy': new ExtractEnergy(),
        'fill-spawn': new FillSpawn(),
        'upgrade-controller': new UpgradeController(),
    };

    public MAIN_SPAWN = Game.spawns[MAIN_SPAWN_NAME];

    public MEMORY = {
        CREEP: {
            ROLE: 'role',
            TASK: 'task',
        },
    };

    constructor() {
        console.log('creating common data');
    }

}

const COMMON = new CommonData();

export default COMMON;
