import { checkCombinationFit, CREEP_PART_PRICES } from '../creep-parts';
import { CreepRole } from '../creep-role';

export class Miner extends CreepRole {

    protected findNewTask(): string {
        return 'mine';
    }

    public getParts(room: Room): BodyPartConstant[] {
        const availableEnergy = room.energyCapacityAvailable - CREEP_PART_PRICES[MOVE];
        const parts: BodyPartConstant[] = [MOVE];
        const count = Math.max(checkCombinationFit([WORK], availableEnergy), 5);
        _.times(count, () => parts.push(WORK));
        return parts;
    }

}
