import { upgraderLowOnEnergy } from '../roles/energy-distributor';

import { Task } from '../task';

export class FillUpgrader extends Task<Creep> {

    protected findTargetId(creep: Creep): string {
        const target = creep.pos.findClosestByPath(FIND_MY_CREEPS, { filter: upgraderLowOnEnergy });
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: Creep): void {
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Creep): boolean {
        return creep.carry.energy === 0 || !target || target.carry.energy === target.carryCapacity;
    }

}
