import { isLowOnEnergyUpgrader, isNotFullExtension, isNotFullTower } from './utilities';

export function findConstructionSites(room: Room): ConstructionSite[] {
    return room.find(FIND_MY_CONSTRUCTION_SITES);
}

export function findNotFullTowers(room: Room): StructureTower[] {
    return room.find(FIND_MY_STRUCTURES, { filter: isNotFullTower }) as StructureTower[];
}

export function findUpgradersWithLowEnergy(room: Room): Creep[] {
    return room.find(FIND_MY_CREEPS, { filter: isLowOnEnergyUpgrader });
}

export function findNotFullExtensions(room: Room): StructureExtension[] {
    return room.find(FIND_STRUCTURES, { filter: isNotFullExtension }) as StructureExtension[];
}

export function findDroppedEnergy(room: Room): Array<Resource<RESOURCE_ENERGY>> {
    return room.find(FIND_DROPPED_ENERGY);
}
