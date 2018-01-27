import { ROOM } from '../../room-utils';

import { Task } from './task';

export class Repair extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): any {
        const structures = ROOM.findStructures(creep.room);
        const damagedStructures = structures.filter((structure) => structure.hits < structure.hitsMax);
        const target = _.min(damagedStructures, (it) => it.hits);
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return creep.carry.energy === 0;
    }

}
