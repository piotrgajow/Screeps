import { MAIN_SPAWN_NAME } from '../../common';
import { findNotFullExtensions } from '../../rooms/finders';
import { hasNoEnergy, isNotFull } from '../../rooms/utilities';

import { CreepRole } from '../creep-role';

export class Harvester extends CreepRole {

    protected findNewTask(): string {
        if (hasNoEnergy(this.creep)) {
            return 'extract-energy';
        } else if (isNotFull(Game.spawns[MAIN_SPAWN_NAME])) {
            return 'fill-spawn';
        } else if (findNotFullExtensions(this.creep.room).length > 0) {
            return 'fill-extensions';
        } else {
            return 'upgrade-controller';
        }
    }

}
