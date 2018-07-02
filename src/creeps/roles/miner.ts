import { CreepRole } from '../creep-role';

export class Miner extends CreepRole {

    protected findNewTask(): string {
        return 'mine';
    }

}
