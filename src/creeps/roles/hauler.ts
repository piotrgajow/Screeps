import { creepIsNotFull } from '../../rooms/utilities';

import { CreepRole } from '../creep-role';

export class Hauler extends CreepRole {

    protected findNewTask(): string {
        if (creepIsNotFull(this.creep)) {
            return 'pick-from-container';
        } else {
            return 'fill-storage';
        }
    }

}
