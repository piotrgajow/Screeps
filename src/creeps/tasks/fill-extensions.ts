import { isEmpty } from '../../utilities/creep-utilities';
import { findClosestNotFullExtension } from '../../utilities/position-finders';
import { isFull } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class FillExtensions extends Task<StructureExtension> {

    protected findTargetId(creep: Creep): string {
        const target = findClosestNotFullExtension(creep.pos);
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: StructureExtension): void {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureExtension): boolean {
        return isEmpty(creep) || !target || isFull(target);
    }

}
