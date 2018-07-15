
import { MEMORY } from '../enums/memory';

import { findCreep, findCreeps, isRemoteHauler, isRemoteMiner, isTargeting } from '../utilities/creeps';
import { isStructure } from '../utilities/look-utilities';
import { isContainer } from '../utilities/structure-utilities';

import { Logger } from '../logging/logger';

const REMOTE_MINE_PREFIX = 'remote-mine';

export class RemoteMine {

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

    get container(): StructureContainer | undefined {
        const containerResult = _.find(this.pos.look(), isContainerStructure) as LookAtResult<LOOK_STRUCTURES>;
        return _.get(containerResult, 'structure') as StructureContainer;
    }

    get hauler(): Creep | undefined {
        return findCreep(isRemoteHauler, isTargeting(this.name));
    }

    get miners(): Creep[] {
        return findCreeps(isRemoteMiner, isTargeting(this.name));
    }

    get hasMiner(): boolean {
        return this.miners.length > 0;
    }

    get source(): Source {
        let sourceId = this.flag.memory[MEMORY.SOURCE];
        if (!sourceId) {
            const sourcesNearby = this.pos.findInRange(FIND_SOURCES, 1);
            if (sourcesNearby.length === 0) {
                Logger.error(this.room.name, 'flag', this.name, 'has no source nearby');
            } else {
                sourceId = sourcesNearby[0].id;
                this.flag.memory[MEMORY.SOURCE] = sourceId;
            }
        }
        return Game.getObjectById(sourceId) as Source;
    }

}

export function findRemoteMines(): RemoteMine[] {
    const flags = _.filter(Game.flags, isRemoteMine);
    return _.map(flags, (it) => new RemoteMine(it));
}

function isRemoteMine(flag: Flag): boolean {
    return flag.name.includes(REMOTE_MINE_PREFIX);
}

function isContainerStructure(it: LookAtResult<LookConstant>): boolean {
    return isStructure(it) && isContainer(it.structure as Structure);
}
