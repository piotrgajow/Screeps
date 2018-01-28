import { Logger } from '../../logger';
import { MEMORY } from '../../memory';

import { Task } from './task';

export class PickUpEnergy extends Task {

    public initialize(creep: Creep): void {
        const energyContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: isContainer });
        if (energyContainer) {
            creep.memory[MEMORY.TARGET] = energyContainer.id;
        } else {
            Logger.error(creep, 'Energy container not found');
        }
    }

    protected executeTask(creep: Creep): any {
        const energyContainer = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureContainer;
        if (creep.withdraw(energyContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(energyContainer);
        }
        return { energyContainer };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return creep.carry.energy === creep.carryCapacity;
    }

}

function isContainer(structure: any): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}
