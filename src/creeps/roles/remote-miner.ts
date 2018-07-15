import { CreepRole } from '../creep-role';

export const REMOTE_MINER = 'remote-miner';

export class RemoteMiner extends CreepRole {

    protected findNewTask(): string {
        return 'mine-remote';
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [WORK, WORK, WORK, CARRY, MOVE, MOVE];
    }

}
