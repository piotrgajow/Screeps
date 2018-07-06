import { CreepRole } from '../creep-role';

export class Upgrader extends CreepRole {

    protected findNewTask(): string {
        return 'upgrade';
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE];
    }

}
