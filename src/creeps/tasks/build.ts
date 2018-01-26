import { Task } from './task';

export class Build extends Task {

    protected executeTask(creep: Creep): void {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return creep.carry.energy === 0;
    }

}
