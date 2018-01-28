import { CreepRole } from '../creep-role';

export class Miner extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.pos.lookFor(LOOK_FLAGS).find((it) => it.name.includes('mine'))) {
            return 'extract-energy';
        } else {
            return 'move-to-mine';
        }
    }

}
