import { MEMORY } from '../../memory';
import { ROOM } from '../../room-utils';

import { Task } from './task';

export class Repair extends Task {

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = this.findStructureToRepair(creep).id;
    }

    protected executeTask(creep: Creep): void {
        const target = Game.getObjectById(creep.memory[MEMORY.TARGET]) as Structure;
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        const target = Game.getObjectById(creep.memory[MEMORY.TARGET]) as Structure;
        return creep.carry.energy === 0 || !target || (target.hits === target.hitsMax);
    }

    private findStructureToRepair(creep: Creep): any {
        const structures = ROOM.findStructures(creep.room);
        const damagedStructures = structures.filter((structure) => structure.hits < structure.hitsMax);
        return _.min(damagedStructures, (it) => it.hits);
    }

}
