import { MEMORY } from '../../memory';

import { Task } from './task';

export class PickUpEnergy extends Task {

    public initialize(creep: Creep): void {
        const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: containerNotEmpty });
        creep.memory[MEMORY.TARGET] = energyContainer.id;
    }

    protected executeTask(creep: Creep): any {
        this.initialize(creep);
        const energyContainer = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureContainer;
        if (creep.withdraw(energyContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(energyContainer);
        }
        return { energyContainer };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return creep.carry.energy === creep.carryCapacity || opts.energyContainer.store.energy === 0;
    }

}

function containerNotEmpty(structure: any) {
    const isContainer = structure.structureType === STRUCTURE_CONTAINER;
    return isContainer && structure.store.energy > 0;
}
