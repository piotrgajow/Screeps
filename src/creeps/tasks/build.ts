import { MEMORY } from '../../memory';

import { Task } from './task';

export class Build extends Task {

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id;
    }

    protected executeTask(creep: Creep): void {
        const target = Game.getObjectById(creep.memory[MEMORY.TARGET]) as ConstructionSite;
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        const targetIsNull = Game.getObjectById(creep.memory[MEMORY.TARGET]) === null;
        return creep.carry.energy === 0 || targetIsNull;
    }

}
