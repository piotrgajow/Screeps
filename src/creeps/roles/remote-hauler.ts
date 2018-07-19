
import { isNotFull } from '../../utilities/creep-utilities';

import { CreepRole } from '../creep-role';

export const REMOTE_HAULER = 'remote-hauler';

const REMOTE_SOURCE_HARVEST_SPEED = 6;
const CARRY_MODULE_CAPACITY = 100;

export class RemoteHauler extends CreepRole {

    protected findNewTask(): string {
        if (isNotFull(this.creep)) {
            return 'pick-from-remote-mine';
        } else {
            return 'fill-storage';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        const combination = [CARRY, CARRY, MOVE];
        const parts: BodyPartConstant[] = [];

        // TODO calculate based on distance
        const ticksDistance = 62;
        const count = Math.ceil(ticksDistance * REMOTE_SOURCE_HARVEST_SPEED / CARRY_MODULE_CAPACITY);

        combination.forEach((part) => _.times(count, () => parts.push(part)));
        return parts;
    }

}
