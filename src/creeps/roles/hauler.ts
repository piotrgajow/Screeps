
import { isNotFull } from '../../utilities/creep-utilities';
import { hasResourcesToScavenge } from '../../utilities/room-finders';

import { CreepRole } from '../creep-role';

export class Hauler extends CreepRole {

    protected findNewTask(): string {
        if (isNotFull(this.creep)) {
            if (hasResourcesToScavenge(this.creep.room)) {
                return 'scavenge';
            } else {
                return 'pick-from-container';
            }
        } else {
            return 'fill-storage';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }

}
