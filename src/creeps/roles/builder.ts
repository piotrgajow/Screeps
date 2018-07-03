
import { findConstructionSites } from '../../rooms/finders';
import { hasNoEnergy } from '../../rooms/utilities';

import { CreepRole } from '../creep-role';

export class Builder extends CreepRole {

    protected findNewTask(): string {
        if (hasNoEnergy(this.creep)) {
            return 'pick-up-energy';
        } else if (findConstructionSites(this.creep.room).length > 0) {
            return 'build';
        } else {
            return 'repair';
        }
    }

}
