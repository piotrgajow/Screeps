import { Builder } from './creeps/builder';
import { CreepRole } from './creeps/creep-role';
import { Harvester } from './creeps/harvester';
import { Hauler } from './creeps/hauler';
import { Worker } from './creeps/worker';

import { Build } from './creeps/tasks/build';
import { ExtractEnergy } from './creeps/tasks/extract-energy';
import { FillExtensions } from './creeps/tasks/fill-extensions';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { FillStorage } from './creeps/tasks/fill-storage';
import { Miner } from './creeps/miner';
import { Mine } from './creeps/tasks/mine';
import { PickFromContainer } from './creeps/tasks/pick-from-container';
import { PickUpEnergy } from './creeps/tasks/pick-up-energy';
import { Repair } from './creeps/tasks/repair';
import { Task } from './creeps/tasks/task';
import { UpgradeController } from './creeps/tasks/upgrade-controller';
import { EnergyDistributor } from './creeps/energy-distributor';

const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        'builder': Builder.prototype,
        'energy-distributor': EnergyDistributor.prototype,
        'harvester': Harvester.prototype,
        'hauler': Hauler.prototype,
        'miner': Miner.prototype,
        'worker': Worker.prototype,
    };

    public TASKS: { [s: string]: Task } = {
        'build': new Build(),
        'extract-energy': new ExtractEnergy(),
        'fill-extensions': new FillExtensions(),
        'fill-spawn': new FillSpawn(),
        'fill-storage': new FillStorage(),
        'mine': new Mine(),
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
