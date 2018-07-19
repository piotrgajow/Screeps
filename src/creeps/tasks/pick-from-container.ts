import { isFull } from '../../utilities/creep-utilities';
import { findClosestHighOnEnergyConainer, findClosestNotEmptyContainer } from '../../utilities/position-finders';
import { getResourceType } from '../../utilities/store-utilities';
import { isEmpty } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class PickFromContainer extends Task<StructureContainer> {

    protected findTargetId(creep: Creep): string {
        let container: StructureContainer | null;
        container = findClosestHighOnEnergyConainer(creep.pos);
        if (!container) {
            container = findClosestNotEmptyContainer(creep.pos);
        }

        return container ? container.id : '';
    }

    protected executeTask(creep: Creep, target: StructureContainer): any {
        if (creep.withdraw(target, getResourceType(target.store)) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureContainer): boolean {
        return isFull(creep) || !target || isEmpty(target);
    }

}
