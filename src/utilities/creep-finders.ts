import { isMiner, isRemoteMiner, isUpgrader } from './creep-utilities';

export function findMiners(): Creep[] {
    return _.filter(_.values(Game.creeps), isMiner);
}

export function findUpgraderCreeps(): Creep[] {
    return _.filter(_.values(Game.creeps), isUpgrader);
}

export function findRemoteMiners(): Creep[] {
    return _.filter(_.values(Game.creeps), isRemoteMiner);
}
