import { MAIN_SPAWN_NAME } from '../../common';
import { isEmpty } from '../../utilities/creep-utilities';
import { isFull } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class FillSpawn extends Task<StructureSpawn> {

    protected findTargetId(creep: Creep): string {
        return Game.spawns[MAIN_SPAWN_NAME].id;
    }

    protected executeTask(creep: Creep, target: StructureSpawn): void {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureSpawn): boolean {
        return isEmpty(creep) || !target || isFull(target);
    }
}
