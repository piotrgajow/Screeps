import { MAIN_SPAWN_NAME } from '../../common';
import { ROOM } from '../../room-utils';

import { CreepRole } from '../creep-role';

export class Harvester extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'extract-energy';
        } else if (Game.spawns[MAIN_SPAWN_NAME].energy < Game.spawns[MAIN_SPAWN_NAME].energyCapacity) {
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
