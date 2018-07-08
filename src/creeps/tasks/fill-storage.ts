import { getResourceType, isEmpty } from '../../utilities/creep-utilities';
import { findClosestNotEmptyStorage } from '../../utilities/position-finders';

import { Task } from '../task';

export class FillStorage extends Task<StructureStorage> {

    protected findTargetId(creep: Creep): string {
        const storage = findClosestNotEmptyStorage(creep.pos);
        return storage ? storage.id : '';
    }

    protected executeTask(creep: Creep, target: StructureStorage): void {
        if (creep.transfer(target, getResourceType(creep)) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureStorage): boolean {
        return isEmpty(creep);
    }

}
