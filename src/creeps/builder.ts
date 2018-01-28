import { ROOM } from '../room-utils';

import { CreepRole } from './creep-role';

export class Builder extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (ROOM.findConstructionSites(this.creep.room).length > 0) {
            return 'build';
        } else {
            return 'repair';
        }
    }

}
