import { hasSomeEnergy } from '../../utilities/creep-utilities';
import { findDroppedEnergy } from '../../utilities/room-finders';

import { CreepRole } from '../creep-role';

export class Scavenger extends CreepRole {

    protected findNewTask(): string {
        if (hasSomeEnergy(this.creep)) {
            return 'fill-storage';
        } else if (findDroppedEnergy(this.creep.room).length > 0) {
            return 'scavenge';
        } else {
            return 'no-op';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, MOVE];
    }

}
