import { MAIN_SPAWN_NAME } from '../../common';
import { findNotFullTowers, findUpgradersWithLowEnergy } from '../../utilities/room-finders';
import { isNotFull as roomIsNotFull } from '../../utilities/room-utilities';
import { isNotFull as structureIsNotFull } from '../../utilities/structure-utilities';

import { CreepRole } from '../creep-role';

export class EnergyDistributor extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (structureIsNotFull(Game.spawns[MAIN_SPAWN_NAME])) {
            return 'fill-spawn';
        } else if (roomIsNotFull(this.creep.room)) {
            return 'fill-extensions';
        } else if (findNotFullTowers(this.creep.room).length) {
            return 'fill-tower';
        } else if (findUpgradersWithLowEnergy(this.creep.room).length) {
            return 'fill-upgrader';
        } else {
            return 'no-op';
        }
    }

    public getParts(room: Room): BodyPartConstant[] {
        return [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
    }

}
