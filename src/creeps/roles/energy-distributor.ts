import { MAIN_SPAWN_NAME } from '../../common';
import { findNotFullTowers, findUpgradersWithLowEnergy } from '../../utilities/room-finders';
import { isNotFull, roomIsNotFull } from '../../utilities/utilities';

import { CreepRole } from '../creep-role';

export class EnergyDistributor extends CreepRole {

    protected findNewTask(): string {
        if (this.creep.carry.energy === 0) {
            return 'pick-up-energy';
        } else if (isNotFull(Game.spawns[MAIN_SPAWN_NAME])) {
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

}
