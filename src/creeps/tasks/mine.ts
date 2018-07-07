import { MEMORY } from '../../enums/memory';
import { Logger } from '../../logging/logger';
import { findClosestNotOccupiedMine } from '../../utilities/position-finders';

import { Task } from '../task';

export class Mine extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        const mineFlag = findClosestNotOccupiedMine(creep.pos);
        return mineFlag ? mineFlag.name : '';
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            const sourceId = target.memory[MEMORY.SOURCE];
            if (!sourceId) {
                Logger.error(creep.room.name, 'flag', target.name, 'has no specified source');
            }
            const source = Game.getObjectById(sourceId) as Source;
            creep.harvest(source);
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: Flag): boolean {
        return !target;
    }

}
