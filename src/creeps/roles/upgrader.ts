import { checkCombinationFit } from '../creep-parts';
import { CreepRole } from '../creep-role';

export class Upgrader extends CreepRole {

    protected findNewTask(): string {
        return 'upgrade';
    }

    public getParts(room: Room): BodyPartConstant[] {
        const combination = [CARRY, WORK, MOVE];
        const availableEnergy = room.energyCapacityAvailable;
        const count = checkCombinationFit(combination, availableEnergy);
        const parts: BodyPartConstant[] = [];
        combination.forEach((part) => _.times(count, () => parts.push(part)));

        return parts;
    }

}
