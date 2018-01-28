import { CreepRole } from '../creep-role';

export class Miner extends CreepRole {

    protected findNewTask(): string {
        const flags = this.creep.pos.lookFor(LOOK_FLAGS);
        if (flags.length && flags.find(findMineFlag)) {
            return 'extract-energy';
        } else {
            return 'move-to-mine';
        }
    }

}

function findMineFlag(flag: any) {
    return flag.name.includes('mine');
}
