import { Logger } from '../../logging/logger';
import { MEMORY } from '../../memory';
import { ROOM } from '../../room-utils';

import { Task } from './task';

export class PickUpEnergy extends Task {

    public initialize(creep: Creep): void {
        const storage = ROOM.findStorage(creep.room);
        if (storage.store.energy > 0) {
            creep.memory[MEMORY.TARGET] = storage.id;
            return;
        }

        const container = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: isContainer });
        if (container) {
            creep.memory[MEMORY.TARGET] = container.id;
            return;
        }

        Logger.error(creep.room.name, creep, '- Energy container not found');
    }

    protected executeTask(creep: Creep): any {
        const energyStorage = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureContainer | StructureStorage;
        if (creep.withdraw(energyStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(energyStorage);
        }
        return { energyStorage };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        const creepIsFull = creep.carry.energy === creep.carryCapacity;
        const energyStorageIsEmpty = opts.energyStorage &&  opts.energyStorage.store.energy === 0;
        return creepIsFull || energyStorageIsEmpty;
    }

}

function isContainer(structure: any): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}
