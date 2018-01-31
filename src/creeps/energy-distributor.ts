import COMMON from '../common';

import { CreepRole } from './creep-role';

export class EnergyDistributor extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (COMMON.MAIN_SPAWN.energy < COMMON.MAIN_SPAWN.energyCapacity) {
            return 'fill-spawn';
        } else if (this.creep.room.energyAvailable < this.creep.room.energyCapacityAvailable) {
            return 'fill-extensions';
        } else if (this.creep.room.find(FIND_MY_STRUCTURES, { filter: isNotFullTower }).length) {
            return 'fill-tower';
        } else {
            return 'no-op';
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
