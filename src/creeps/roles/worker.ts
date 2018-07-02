import { MAIN_SPAWN_NAME } from '../../common';
import { ROOM } from '../../room-utils';

import { CreepRole } from '../creep-role';

export class Worker extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'extract-energy';
        } else if (Game.spawns[MAIN_SPAWN_NAME].energy < Game.spawns[MAIN_SPAWN_NAME].energyCapacity) {
            return 'fill-spawn';
        } else if (ROOM.findConstructionSites(this.creep.room).length > 0) {
            return 'build';
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
