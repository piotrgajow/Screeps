import { isMine, isUpgradeSite } from './flag-utilities';

export function findMines(): string[] {
    return getFlagNames(isMine);
}

export function findUpgradeSites(): string[] {
    return getFlagNames(isUpgradeSite);
}

function getFlagNames(filterFunction: (p: Flag) => boolean): string[] {
    const flags = _.filter(Game.flags, filterFunction);
    return _.map(flags, (flag) => flag.name);
}
