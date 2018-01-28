import COMMON from '../common';

import { CreepRole } from './creep-role';
import { ROOM } from '../room-utils';

export class Harvester extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'extract-energy';
        } else if (COMMON.MAIN_SPAWN.energy !== COMMON.MAIN_SPAWN.energyCapacity) {
            return 'fill-spawn';
        } else if (_.any(ROOM.findExtensions(this.creep.room), Harvester.extensionNotFull)) {
            return 'fill-extensions';
        } else {
            return 'upgrade-controller';
        }
    }

    private static extensionNotFull(extension: StructureExtension): boolean {
        return extension.energy < extension.energyCapacity;
    }

}
