import COMMON from '../../common';

import { Task } from './task';

export class FillSpawn extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): void {
        if (creep.transfer(COMMON.MAIN_SPAWN, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(COMMON.MAIN_SPAWN);
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return creep.carry.energy === 0 || COMMON.MAIN_SPAWN.energy === COMMON.MAIN_SPAWN.energyCapacity;
    }
}
