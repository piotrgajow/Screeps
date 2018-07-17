import { MEMORY } from '../enums/memory';

import { findMiners, findUpgraderCreeps } from './creep-finders';
import { isLowOnEnergyUpgrader } from './creep-utilities';
import { findMines, findUpgradeSites } from './flag-finders';
import {
    isFilledContainer,
    isHighOnEnergyContainer,
    isNotEmptyStorage,
    isNotFullExtension,
    isNotFullTower,
} from './structure-utilities';
import { isNotEmpty } from './tombstone-utilities';

export function findClosestConstructionSite(position: RoomPosition): ConstructionSite | null {
    return position.findClosestByRange(FIND_CONSTRUCTION_SITES);
}

export function findClosestSource(position: RoomPosition): Source | null {
    return position.findClosestByPath(FIND_SOURCES);
}

export function findClosestNotFullExtension(position: RoomPosition): StructureExtension | null {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotFullExtension }) as StructureExtension;
}

export function findClosestNotEmptyStorage(position: RoomPosition): StructureStorage | null {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotEmptyStorage }) as StructureStorage;
}

export function findClosestNotFullTower(position: RoomPosition): StructureTower | null {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotFullTower }) as StructureTower;
}

export function findClosestLowOnEnergyUpgrader(position: RoomPosition): Creep | null {
    return position.findClosestByPath(FIND_MY_CREEPS, { filter: isLowOnEnergyUpgrader }) as Creep;
}

export function findClosestHighOnEnergyConainer(position: RoomPosition): StructureContainer | null {
    return position.findClosestByPath(FIND_STRUCTURES, { filter: isHighOnEnergyContainer }) as StructureContainer;
}

export function findClosestNotEmptyContainer(position: RoomPosition): StructureContainer | null {
    return position.findClosestByPath(FIND_STRUCTURES, { filter: isFilledContainer }) as StructureContainer;
}

export function findClosestDroppedResources(position: RoomPosition): Resource | null {
    return position.findClosestByPath(FIND_DROPPED_RESOURCES);
}

export function findClosestNotOccupiedMine(position: RoomPosition): Flag | null {
    const mines = findMines();
    const minerCreeps = findMiners();
    const validMines = _.filter(mines, (mineFlagName) => {
        return _.every(minerCreeps, (c) => {
            return c.memory[MEMORY.TARGET] !== mineFlagName;
        });
    });
    const validMineFlags: Flag[] = _.map(validMines, (mineName) => Game.flags[mineName]);
    return position.findClosestByPath(validMineFlags);
}

export function findClosestNotOccupiedUpgradeSite(position: RoomPosition): Flag | null {
    const upgradeSites = findUpgradeSites();
    const upgraderCreeps = findUpgraderCreeps();
    const validUpgradeSites = _.filter(upgradeSites, (flagName) => {
        return _.every(upgraderCreeps, (c) => {
            return c.memory[MEMORY.TARGET] !== flagName;
        });
    });
    const validFlags: Flag[] = _.map(validUpgradeSites, (name) => Game.flags[name]);
    return position.findClosestByPath(validFlags);
}

export function findClosestTombstone(position: RoomPosition): Tombstone | null {
    return position.findClosestByPath(FIND_TOMBSTONES, { filter: isNotEmpty });
}

export function lookForConstructionSite(position: RoomPosition): ConstructionSite | null {
    const constructionSites = position.lookFor(LOOK_CONSTRUCTION_SITES);
    return constructionSites.length > 0 ? constructionSites[0] : null;
}
