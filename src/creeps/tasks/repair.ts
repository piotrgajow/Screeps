import { isEmpty } from '../../utilities/creep-utilities';
import { findDamagedStructures } from '../../utilities/room-finders';
import { isIntact } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class Repair extends Task<Structure> {

    protected findTargetId(creep: Creep): string {
        const structures = findDamagedStructures(creep.room);
        const target = _.min(structures, (it) => it.hits);
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: Structure): void {
        if (target) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Structure): boolean {
        return isEmpty(creep) || !target || isIntact(target);
    }

}
