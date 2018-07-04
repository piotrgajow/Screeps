import { isFull } from '../../utilities/creep-utilities';
import { findClosestDroppedEnergy } from '../../utilities/position-finders';

import { Task } from '../task';

export class Scavenge extends Task<Resource> {

    protected findTargetId(creep: Creep): string {
        const resource = findClosestDroppedEnergy(creep.pos);
        return resource ? resource.id : '';
    }

    protected executeTask(creep: Creep, target: Resource): void {
        if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: Resource): boolean {
        return isFull(creep) || !target;
    }

}
