
import { isNotFull } from '../../utilities/creep-utilities';

import { CreepRole } from '../creep-role';

export class Hauler extends CreepRole {

    protected findNewTask(): string {
        if (isNotFull(this.creep)) {
            return 'pick-from-container';
        } else {
            return 'fill-storage';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }

}
