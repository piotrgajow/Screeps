import { isEmpty } from '../../utilities/creep-utilities';
import { findClosestStorage } from '../../utilities/position-finders';

import { Task } from '../task';

export class FillStorage extends Task<StructureStorage> {

    protected findTargetId(creep: Creep): string {
        const storage = findClosestStorage(creep.pos);
        return storage ? storage.id : '';
    }

    protected executeTask(creep: Creep, target: StructureStorage): void {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureStorage): boolean {
        return isEmpty(creep);
    }
}
