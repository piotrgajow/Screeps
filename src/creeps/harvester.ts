
import { CreepRole } from './creep-role';
import { Task } from './tasks/task';
import COMMON from '../common';

export class Harvester extends CreepRole {

    protected findNewTask(): Prototype<Task> {
        if (this.creep.carry.energy === this.creep.carryCapacity) {
            if (COMMON.MAIN_SPAWN.energy === COMMON.MAIN_SPAWN.energyCapacity) {
                return 'upgrade-controller';
            } else {
                return 'fill-spawn';
            }
        } else {
            return 'extract-energy';
        }
    }

}
