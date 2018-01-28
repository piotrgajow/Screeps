import { MEMORY } from '../../memory';

import { Task } from './task';

export class MoveToMine extends Task {

    public initialize(creep: Creep): void {
        const mineFlag = creep.room.find(FIND_FLAGS, { filter: (it) => it.name.includes('mine') }) as Flag;
        const mineContainer = mineFlag.pos.lookFor(LOOK_STRUCTURES)
            .find((it) => it.structureType === STRUCTURE_CONTAINER);
        creep.memory[MEMORY.TARGET] = mineContainer.id;
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
