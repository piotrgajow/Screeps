import { findClosestNotOccupiedUpgradeSite } from '../../utilities/position-finders';

import { Task } from '../task';

export class Upgrade extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        return findClosestNotOccupiedUpgradeSite(creep.pos).name;
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            if (creep.carry.energy > 0) {
                creep.upgradeController(creep.room.controller as StructureController);
            }
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return false;
    }

}
