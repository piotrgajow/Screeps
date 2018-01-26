import COMMON from '../common';

import { CreepRole } from './creep-role';
import {ROOM} from '../room-utils';

export class Harvester extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === this.creep.carryCapacity) {
            if (COMMON.MAIN_SPAWN.energy < COMMON.MAIN_SPAWN.energyCapacity) {
                return 'fill-spawn';
            } else if (ROOM.findExtensions(this.creep.room).find((extension) => {
                    return extension.energy < extension.energyCapacity;
                })) {
                return 'fill-extensions';
            } else {
                return 'upgrade-controller';
            }
        } else {
            return 'extract-energy';
        }
    }

}
