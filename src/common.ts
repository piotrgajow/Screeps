import { Builder } from './creeps/builder';
import { CreepRole } from './creeps/creep-role';
import { Harvester } from './creeps/harvester';
import { Worker } from './creeps/worker';

import { Build } from './creeps/tasks/build';
import { ExtractEnergy } from './creeps/tasks/extract-energy';
import { FillExtensions } from './creeps/tasks/fill-extensions';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { Miner } from './creeps/tasks/miner';
import { MoveToMine } from './creeps/tasks/move-to-mine';
import { PickFromContainer } from './creeps/tasks/pick-from-container';
import { PickUpEnergy } from './creeps/tasks/pick-up-energy';
import { Repair } from './creeps/tasks/repair';
import { Task } from './creeps/tasks/task';
import { UpgradeController } from './creeps/tasks/upgrade-controller';

const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        builder: Builder.prototype,
        harvester: Harvester.prototype,
        miner: Miner.prototype,
        worker: Worker.prototype,
    };

    public TASKS: { [s: string]: Task } = {
        'build': new Build(),
        'extract-energy': new ExtractEnergy(),
        'fill-extensions': new FillExtensions(),
        'fill-spawn': new FillSpawn(),
        'move-to-mine': new MoveToMine(),
        'pick-from-container': new PickFromContainer(),
        'pick-up-energy': new PickUpEnergy(),
        'repair': new Repair(),
        'upgrade-controller': new UpgradeController(),
    };

    public MAIN_SPAWN = Game.spawns[MAIN_SPAWN_NAME];

    public MEMORY = {
        CREEP: {
            ROLE: 'role',
            TARGET: 'target',
            TASK: 'task',
        },
    };

}

const COMMON = new CommonData();

export default COMMON;
