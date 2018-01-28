import { MEMORY } from '../../memory';

import { Task } from './task';

export class MoveToMine extends Task {

    public initialize(creep: Creep): void {
        const mineFlag = creep.room.find(FIND_FLAGS, { filter: (it) => it.name.includes('mine') })[0] as Flag;
        const mineStructures = mineFlag.pos.lookFor(LOOK_STRUCTURES) || [];
        const mineContainer = mineStructures.find(findContainers);
        if (mineContainer) {
            creep.memory[MEMORY.TARGET] = mineContainer.id;
        } else {
            console.error('No mine found!');
        }
    }

    protected executeTask(creep: Creep): any {
        const mine = Game.getObjectById(creep.memory[MEMORY.TARGET]) as Structure;
        creep.moveTo(mine);
        return { mine };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return creep.pos === opts.mine.pos;
    }

}

function findContainers(structure: any): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}
