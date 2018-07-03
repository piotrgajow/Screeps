import { isEmpty } from '../../utilities/creep-utilities';
import { findClosestConstructionSite } from '../../utilities/position-finders';

import { Task } from '../task';

export class Build extends Task<ConstructionSite> {

    protected findTargetId(creep: Creep): string {
        const target = findClosestConstructionSite(creep.pos);
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: ConstructionSite): void {
        if (target) {
            if (creep.build(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: ConstructionSite): boolean {
        return isEmpty(creep) || !target;
    }

}
