import { CreepRole } from '../creep-role';

export class Miner extends CreepRole {

    protected findNewTask(): string {
        return 'mine';
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [MOVE, WORK, WORK, WORK, WORK, WORK];
    }

}
