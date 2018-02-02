import { CreepRole } from '../creep-role';

export class Scavenger extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy >0) {
            return 'fill-storage';
        } else if (this.creep.room.find(FIND_DROPPED_ENERGY).length) {
            return 'scavenge';
        } else {
            return 'no-op';
        }
    }

}
