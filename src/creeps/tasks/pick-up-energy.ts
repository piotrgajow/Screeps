import { isFull } from '../../utilities/creep-utilities';
import { findClosestNotEmptyContainer, findClosestStorage } from '../../utilities/position-finders';

import { Task } from '../task';

export class PickUpEnergy extends Task<StructureStorage | StructureContainer> {

    protected findTargetId(creep: Creep): string {
        let target: StructureStorage | StructureContainer;
        target = findClosestStorage(creep.pos);
        if (!target) {
            target = findClosestNotEmptyContainer(creep.pos);
        }
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: StructureStorage | StructureContainer): void {
        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureStorage | StructureContainer): boolean {
        return isFull(creep) || !target;
    }

}
