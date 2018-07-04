import { isEmpty } from '../../utilities/creep-utilities';
import { findClosestNotFullTower } from '../../utilities/position-finders';
import { isFull } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class FillTower extends Task<StructureTower> {

    protected findTargetId(creep: Creep): string {
        const tower = findClosestNotFullTower(creep.pos);
        return tower ? tower.id : '';
    }

    protected executeTask(creep: Creep, target: StructureTower): void {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureTower): boolean {
        return isEmpty(creep) || !target || isFull(target);
    }

}
