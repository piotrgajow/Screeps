import { MAIN_SPAWN_NAME } from '../../common';
import { isEmpty } from '../../utilities/creep-utilities';
import { findConstructionSites, findNotFullExtensions } from '../../utilities/room-finders';
import { isNotFull } from '../../utilities/structure-utilities';

import { CreepRole } from '../creep-role';

export class Worker extends CreepRole {

    protected findNewTask(): string {
        if (isEmpty(this.creep)) {
            return 'extract-energy';
        } else if (isNotFull(Game.spawns[MAIN_SPAWN_NAME])) {
            return 'fill-spawn';
        } else if (findNotFullExtensions(this.creep.room).length > 0) {
            return 'fill-extensions';
        } else if (findConstructionSites(this.creep.room).length > 0) {
            return 'build';
        } else {
            return 'upgrade-controller';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [WORK, WORK, CARRY, MOVE];
    }

}
