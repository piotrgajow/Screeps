import COMMON from '../common';

import { CreepRole } from './creep-role';

export class Harvester extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === this.creep.carryCapacity) {
            if (COMMON.MAIN_SPAWN.energy === COMMON.MAIN_SPAWN.energyCapacity) {
                return 'upgrade-controller';
            } else {
                return 'fill-spawn';
            }
        } else {
            return 'extract-energy';
        }
    }

}
