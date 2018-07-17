
import { MEMORY } from '../enums/memory';

import { findCreeps, isMiner, isTargeting } from '../utilities/creeps';

import { Logger } from '../logging/logger';

const MINE_PREFIX = 'mine';

export class Mine {

    constructor(
        private flag: Flag,
    ) {
    }

    get name(): string {
        return this.flag.name;
    }

    get pos(): RoomPosition {
        return this.flag.pos;
    }

    get room(): Room {
        return this.flag.room!;
    }

    get miners(): Creep[] {
        return findCreeps(isMiner, isTargeting(this.name));
    }

    get hasMiner(): boolean {
        return this.miners.length > 0;
    }

    get source(): Source | Mineral {
        let sourceId = this.flag.memory[MEMORY.SOURCE];
        if (!sourceId) {
            let sourcesNearby: Source[] | Mineral[];
            sourcesNearby = this.pos.findInRange(FIND_SOURCES, 1);
            if (sourcesNearby.length === 0) {
                sourcesNearby = this.pos.findInRange(FIND_MINERALS, 1);
            }

            if (sourcesNearby.length === 0) {
                Logger.error(this.room.name, 'flag', this.name, 'has neither source nor mineral nearby');
            } else {
                sourceId = sourcesNearby[0].id;
                this.flag.memory[MEMORY.SOURCE] = sourceId;
            }
        }
        return Game.getObjectById(sourceId) as Source | Mineral;
    }

}

export function findMines(): Mine[] {
    const flags = _.filter(Game.flags, isMine);
    return _.map(flags, (it) => new Mine(it));
}

function isMine(flag: Flag): boolean {
    return flag.name.includes(MINE_PREFIX);
}
