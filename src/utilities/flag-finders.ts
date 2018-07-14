import { MEMORY } from '../enums/memory';

import { findRemoteMiners } from './creep-finders';
import { isMine, isRemoteMine, isUpgradeSite } from './flag-utilities';

export function findMines(): string[] {
    return getFlagNames(isMine);
}

export function findUpgradeSites(): string[] {
    return getFlagNames(isUpgradeSite);
}

export function findNotOccupiedRemoteMine(): string | null {
    const remoteMineFlags = getFlagNames(isRemoteMine);
    const remoteMinerCreeps = findRemoteMiners();
    const validRemoteMineSites = _.filter(remoteMineFlags, (flagName) => {
        return _.every(remoteMinerCreeps, (c) => {
            return c.memory[MEMORY.TARGET] !== flagName;
        });
    });
    return validRemoteMineSites.length > 0 ? validRemoteMineSites[0] : null;
}

function getFlagNames(filterFunction: (p: Flag) => boolean): string[] {
    const flags = _.filter(Game.flags, filterFunction);
    return _.map(flags, (flag) => flag.name);
}
