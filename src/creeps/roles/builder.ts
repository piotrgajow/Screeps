import { isEmpty } from '../../utilities/creep-utilities';
import { findConstructionSites } from '../../utilities/room-finders';

import { CreepRole } from '../creep-role';

export class Builder extends CreepRole {

    protected findNewTask(): string {
        if (isEmpty(this.creep)) {
            return 'pick-up-energy';
        } else if (findConstructionSites(this.creep.room).length > 0) {
            return 'build';
        } else {
            return 'repair';
        }
    }

}
