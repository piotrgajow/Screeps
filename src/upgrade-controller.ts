
import { MEMORY_PATH, MEMORY_TASK } from './constants';

export function execute(creep: Creep): void {
    if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController);
    }
    if (creep.carry.energy === 0) {
        creep.memory[MEMORY_TASK] = '';
    }
}
