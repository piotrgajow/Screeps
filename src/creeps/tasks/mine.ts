import { MEMORY } from '../../enums/memory';
import { findClosestNotOccupiedMine } from '../../utilities/position-finders';

import { Task } from '../task';

export class Mine extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        return findClosestNotOccupiedMine(creep.pos).name;
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            const source = Game.getObjectById(target.memory[MEMORY.SOURCE]) as Source;
            creep.harvest(source);
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return false;
    }

}
