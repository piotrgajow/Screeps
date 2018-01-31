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
        } else {
            return '';
        }
    }

}

