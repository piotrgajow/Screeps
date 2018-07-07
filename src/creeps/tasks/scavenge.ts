import { isFull } from '../../utilities/creep-utilities';
import { findClosestDroppedResources, findClosestTombstone } from '../../utilities/position-finders';
import { isEmpty } from '../../utilities/tombstone-utilities';

import { Task } from '../task';

export class Scavenge extends Task<Resource | Tombstone> {

    protected findTargetId(creep: Creep): string {
        const resource = findClosestDroppedResources(creep.pos);
        if (resource) {
            return resource.id;
        }
        const tombstone = findClosestTombstone(creep.pos);
        return tombstone ? tombstone.id : '';
    }

    protected executeTask(creep: Creep, target: Resource | Tombstone): void {
        if (target instanceof Resource) {
            if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        } else {
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Resource | Tombstone): boolean {
        return isFull(creep) || !target || isEmpty(target as Tombstone);
    }

}
