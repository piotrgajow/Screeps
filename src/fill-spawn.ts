
import { MAIN_SPAWN, MEMORY_TASK } from './constants';

export function execute(creep: Creep): void {
    if (creep.transfer(Game.spawns[MAIN_SPAWN], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns[MAIN_SPAWN]);
    }
    if (creep.carry.energy === 0 || Game.spawns[MAIN_SPAWN].energy === Game.spawns[MAIN_SPAWN].energyCapacity) {
        creep.memory[MEMORY_TASK] = '';
    }
}
