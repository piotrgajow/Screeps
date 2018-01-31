import { MEMORY } from '../../memory';

import { Task } from './task';

export class FillTower extends Task {

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = this.findTarget(creep);
    }

    protected executeTask(creep: Creep): void {
        const tower = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureTower;
        if (!tower) {
            return;
        }

        if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(tower, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        const tower = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureTower;
        return !tower || creep.carry.energy === 0 || tower.energy === tower.energyCapacity;
    }

    protected findTarget(creep: Creep): string {
        const towers = creep.room.find(FIND_MY_STRUCTURES, { filter: isNotFullTower });
        if (towers.length) {
            return creep.pos.findClosestByPath(towers).id;
        } else {
            return '';
        }
    }

}

function isNotFullTower(structure: Structure): boolean {
    if (structure.structureType !== STRUCTURE_TOWER) {
         return false;
    }
    const tower = structure as StructureTower;
    return tower.energy < tower.energyCapacity;
}
