import { isFull } from '../../utilities/creep-utilities';
import { findClosestDroppedResources, findClosestTombstone } from '../../utilities/position-finders';
import { getResourceType, isEmpty } from '../../utilities/tombstone-utilities';

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
            const tombstone = target as Tombstone;
            if (creep.withdraw(target, getResourceType(tombstone)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Resource | Tombstone): boolean {
        return isFull(creep) || !target || isEmpty(target as Tombstone);
    }

}
