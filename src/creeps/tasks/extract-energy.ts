import { isFull } from '../../utilities/creep-utilities';
import { findClosestSource } from '../../utilities/position-finders';

import { Task } from '../task';

export class ExtractEnergy extends Task<Source> {

    protected findTargetId(creep: Creep): string {
        const source = findClosestSource(creep.pos);
        return source ? source.id : '';
    }

    protected executeTask(creep: Creep, target: Source): void {
        if (target) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Source): boolean {
        return isFull(creep) || !target;
    }

}
