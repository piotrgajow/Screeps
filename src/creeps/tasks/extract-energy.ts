import { Task } from '../task';
import { Logger } from '../../logging/logger';

export class ExtractEnergy extends Task<Source> {

    protected findTargetId(creep: Creep): string {
        const source = creep.pos.findClosestByPath(FIND_SOURCES) as Source;
        if (!source) {
            Logger.log(creep.room.name, 'No available source found');
            return '';
        }
        return source.id;
    }

    protected executeTask(creep: Creep, target: Source): void {
        if (target) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Source): boolean {
        return creep.carry.energy === creep.carryCapacity || !target;
    }
}
