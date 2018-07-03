import { isEmpty, isFull } from '../../utilities/creep-utilities';
import { findClosestLowOnEnergyUpgrader } from '../../utilities/position-finders';

import { Task } from '../task';

export class FillUpgrader extends Task<Creep> {

    protected findTargetId(creep: Creep): string {
        const target = findClosestLowOnEnergyUpgrader(creep.pos);
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
        return isEmpty(creep) || !target || isFull(target);
    }

}
