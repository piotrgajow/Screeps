import { MAIN_SPAWN_NAME } from '../../common';

import { Task } from './task';

export class FillSpawn extends Task {

    public initialize(creep: Creep): void {
        return;
    }

    protected executeTask(creep: Creep): void {
        if (creep.transfer(Game.spawns[MAIN_SPAWN_NAME], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[MAIN_SPAWN_NAME], { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        const spawnIsFull = Game.spawns[MAIN_SPAWN_NAME].energy === Game.spawns[MAIN_SPAWN_NAME].energyCapacity;
        return creep.carry.energy === 0 || spawnIsFull;
    }
}
