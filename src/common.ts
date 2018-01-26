import { Builder } from './creeps/builder';
import { CreepRole } from './creeps/creep-role';
import { Harvester } from './creeps/harvester';

import { Build } from './creeps/tasks/build';
import { ExtractEnergy } from './creeps/tasks/extract-energy';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { Task } from './creeps/tasks/task';
import { UpgradeController } from './creeps/tasks/upgrade-controller';

const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        builder: Builder.prototype,
        harvester: Harvester.prototype,
    };

    public TASKS: { [s: string]: Task } = {
        'build': new Build(),
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
