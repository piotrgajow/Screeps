import { MEMORY } from '../enums/memory';

import { findMiners, findUpgraderCreeps } from './creep-finders';
import { isLowOnEnergyUpgrader } from './creep-utilities';
import { findMines, findUpgradeSites } from './flag-finders';
import {
    isHighOnEnergyContainer,
    isNotEmptyContainer,
    isNotFullExtension,
    isNotFullTower,
    isStorage
} from './structure-utilities';

export function findClosestConstructionSite(position: RoomPosition): ConstructionSite {
    return position.findClosestByRange(FIND_CONSTRUCTION_SITES);
}

export function findClosestSource(position: RoomPosition): Source {
    return position.findClosestByPath(FIND_SOURCES);
}

export function findClosestNotFullExtension(position: RoomPosition): StructureExtension {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotFullExtension }) as StructureExtension;
}

export function findClosestStorage(position: RoomPosition): StructureStorage {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isStorage }) as StructureStorage;
}

export function findClosestNotFullTower(position: RoomPosition): StructureTower {
    return position.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotFullTower }) as StructureTower;
}

export function findClosestLowOnEnergyUpgrader(position: RoomPosition): Creep {
    return position.findClosestByPath(FIND_MY_CREEPS, { filter: isLowOnEnergyUpgrader }) as Creep;
}

export function findClosestHighOnEnergyConainer(position: RoomPosition): StructureContainer {
    return position.findClosestByPath(FIND_STRUCTURES, { filter: isHighOnEnergyContainer }) as StructureContainer;
}

export function findClosestNotEmptyContainer(position: RoomPosition): StructureContainer {
    return position.findClosestByPath(FIND_STRUCTURES, { filter: isNotEmptyContainer }) as StructureContainer;
}

export function findClosestDroppedEnergy(position: RoomPosition): Resource<RESOURCE_ENERGY> {
    return position.findClosestByPath(FIND_DROPPED_ENERGY);
}

export function findClosestNotOccupiedMine(position: RoomPosition): Flag {
    const mines = findMines();
    const minerCreeps = findMiners();
    const validMines = _.filter(mines, (mineFlagName) => {
        return _.every(minerCreeps, (c) => {
            return c.memory[MEMORY.TARGET] !== mineFlagName;
        }) ;
    });
    const validMineFlags: Flag[] = _.map(validMines, (mineName) => Game.flags[mineName]);
    return position.findClosestByPath(validMineFlags);
}

export function findClosestNotOccupiedUpgradeSite(position: RoomPosition): Flag {
    const upgradeSites = findUpgradeSites();
    const upgraderCreeps = findUpgraderCreeps();
    const validUpgradeSites = _.filter(upgradeSites, (flagName) => {
        return _.every(upgraderCreeps, (c) => {
            return c.memory[MEMORY.TARGET] !== flagName;
        }) ;
    });
    const validFlags: Flag[] = _.map(validUpgradeSites, (name) => Game.flags[name]);
    return position.findClosestByPath(validFlags);
}
