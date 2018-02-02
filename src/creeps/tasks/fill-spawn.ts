import { MAIN_SPAWN_NAME } from '../../common';

import { Task } from '../task';

export class FillSpawn extends Task<StructureSpawn> {

    protected findTargetId(creep: Creep): string {
        return Game.spawns[MAIN_SPAWN_NAME].id;
    }

    protected executeTask(creep: Creep, target: StructureSpawn): void {
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureSpawn): boolean {
        return creep.carry.energy === 0 || !target || target.energy === target.energyCapacity;
    }
}
