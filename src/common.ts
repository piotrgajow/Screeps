import { CreepRole } from './creeps/creep-role';
import { Builder } from './creeps/roles/builder';
import { EnergyDistributor } from './creeps/roles/energy-distributor';
import { Hauler } from './creeps/roles/hauler';
import { Miner } from './creeps/roles/miner';
import { RemoteMiner } from './creeps/roles/remote-miner';
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
import { MineRemote } from './creeps/tasks/mine-remote';
import { NoOp } from './creeps/tasks/no-op';
import { PickFromContainer } from './creeps/tasks/pick-from-container';
import { PickFromRemoteMine } from './creeps/tasks/pick-from-remote-mine';
import { PickUpEnergy } from './creeps/tasks/pick-up-energy';
import { Repair } from './creeps/tasks/repair';
import { Scavenge } from './creeps/tasks/scavenge';
import { Upgrade } from './creeps/tasks/upgrade';
import { UpgradeController } from './creeps/tasks/upgrade-controller';

export const MAIN_SPAWN_NAME = 'Spawn1';

class CommonData {

    public ROLES: { [s: string]: CreepRole } = {
        'builder': Builder.prototype,
        'energy-distributor': EnergyDistributor.prototype,
        'hauler': Hauler.prototype,
        'miner': Miner.prototype,
        'remote-miner': RemoteMiner.prototype,
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
        'mine-remote': new MineRemote(),
        'no-op': new NoOp(),
        'pick-from-container': new PickFromContainer(),
        'pick-from-remote-mine': new PickFromRemoteMine(),
        'pick-up-energy': new PickUpEnergy(),
        'repair': new Repair(),
        'scavenge': new Scavenge(),
        'upgrade': new Upgrade(),
        'upgrade-controller': new UpgradeController(),
    };

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
