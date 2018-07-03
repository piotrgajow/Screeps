import { findDroppedEnergy } from '../../rooms/finders';
import { hasSomeEnergy } from '../../rooms/utilities';

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

}
