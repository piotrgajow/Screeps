import { MAIN_SPAWN_NAME } from '../../common';
import { MEMORY } from '../../enums/memory';

import { CreepRole } from '../creep-role';

export class EnergyDistributor extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (Game.spawns[MAIN_SPAWN_NAME].energy < Game.spawns[MAIN_SPAWN_NAME].energyCapacity) {
            return 'fill-spawn';
        } else if (this.creep.room.energyAvailable < this.creep.room.energyCapacityAvailable) {
            return 'fill-extensions';
        } else if (this.creep.room.find(FIND_MY_STRUCTURES, { filter: isNotFullTower }).length) {
            return 'fill-tower';
        } else if (this.creep.room.find(FIND_MY_CREEPS, { filter: upgraderLowOnEnergy })) {
            return 'fill-upgrader';
        } else {
            return 'no-op';
        }
    }

}

const LOW_THRESHOLD = 50;

function isNotFullTower(structure: Structure): boolean {
    if (structure.structureType !== STRUCTURE_TOWER) {
        return false;
    }
    const tower = structure as StructureTower;
    return tower.energy < tower.energyCapacity;
}

export function upgraderLowOnEnergy(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'upgrader' && creep.carry.energy < LOW_THRESHOLD;
}
