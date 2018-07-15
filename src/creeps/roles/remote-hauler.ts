
import { isNotFull } from '../../utilities/creep-utilities';

import { CreepRole } from '../creep-role';

export const REMOTE_HAULER = 'remote-hauler';

export class RemoteHauler extends CreepRole {

    protected findNewTask(): string {
        if (isNotFull(this.creep)) {
            return 'pick-from-remote-mine';
        } else {
            return 'fill-storage';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }

}
