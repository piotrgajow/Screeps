import { CreepRole } from './creep-role';

export class Builder extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === this.creep.carryCapacity) {
            return 'build';
        } else {
            return 'extract-energy';
        }
    }

}
