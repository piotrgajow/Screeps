import COMMON from '../common';
import { ROOM } from '../room-utils';

import { CreepRole } from './creep-role';

export class Worker extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (COMMON.MAIN_SPAWN.energy < COMMON.MAIN_SPAWN.energyCapacity) {
            return 'fill-spawn';
        } else if (_.any(ROOM.findExtensions(this.creep.room), Worker.extensionNotFull)) {
            return 'fill-extensions';
        } else {
            return 'upgrade-controller';
        }
    }

    private static extensionNotFull(extension: StructureExtension): boolean {
        return extension.energy < extension.energyCapacity;
    }

}
