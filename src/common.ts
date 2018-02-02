import { CreepRole } from './creeps/creep-role';
import { Builder } from './creeps/roles/builder';
import { EnergyDistributor } from './creeps/roles/energy-distributor';
import { Harvester } from './creeps/roles/harvester';
import { Hauler } from './creeps/roles/hauler';
import { Miner } from './creeps/roles/miner';
import { Upgrader } from './creeps/roles/upgrader';
import { Worker } from './creeps/roles/worker';

import { Task } from './creeps/task';
import { Build } from './creeps/tasks/build';
import { ExtractEnergy } from './creeps/tasks/extract-energy';
import { FillExtensions } from './creeps/tasks/fill-extensions';
import { FillSpawn } from './creeps/tasks/fill-spawn';
import { FillStorage } from './creeps/tasks/fill-storage';
import { FillTower } from './creeps/tasks/fill-tower';
import { FillUpgrader } from './creeps/tasks/fill-upgrader';
import { Mine } from './creeps/tasks/mine';
import { NoOp } from './creeps/tasks/no-op';
import { PickFromContainer } from './creeps/tasks/pick-from-container';
import { PickUpEnergy } from './creeps/tasks/pick-up-energy';
import { Repair } from './creeps/tasks/repair';
import { Upgrade } from './creeps/tasks/upgrade';
import { UpgradeController } from './creeps/tasks/upgrade-controller';

export const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        'builder': Builder.prototype,
        'energy-distributor': EnergyDistributor.prototype,
        'harvester': Harvester.prototype,
        'hauler': Hauler.prototype,
        'miner': Miner.prototype,
        'upgrader': Upgrader.prototype,
        'worker': Worker.prototype,
    };

    public TASKS: { [s: string]: Task<any> } = {
        'build': new Build(),
        'extract-energy': new ExtractEnergy(),
        'fill-extensions': new FillExtensions(),
        'fill-spawn': new FillSpawn(),
        'fill-storage': new FillStorage(),
        'fill-tower': new FillTower(),
        'fill-upgrader': new FillUpgrader(),
        'mine': new Mine(),
        'no-op': new NoOp(),
        'pick-from-container': new PickFromContainer(),
        'pick-up-energy': new PickUpEnergy(),
        'repair': new Repair(),
        'upgrade': new Upgrade(),
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
