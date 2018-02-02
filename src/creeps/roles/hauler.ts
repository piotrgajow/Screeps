import { CreepRole } from '../creep-role';

export class Hauler extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy < this.creep.carryCapacity) {
            return 'pick-from-container';
        } else {
            return 'fill-storage';
        }
    }

}
