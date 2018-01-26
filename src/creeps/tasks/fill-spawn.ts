import COMMON from '../../common';

import { Task } from './task';

export class FillSpawn extends Task {

    protected executeTask(creep: Creep): void {
        console.log('fill-spawn-1');
        if (creep.transfer(COMMON.MAIN_SPAWN, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(COMMON.MAIN_SPAWN);
        }
        console.log('fill-spawn-2');
    }

    protected isTaskFinished(creep: Creep): boolean {
        console.log(creep.carry.energy);
        console.log(COMMON.MAIN_SPAWN.energy === COMMON.MAIN_SPAWN.energyCapacity);
        return creep.carry.energy === 0 || COMMON.MAIN_SPAWN.energy === COMMON.MAIN_SPAWN.energyCapacity;
    }
}
