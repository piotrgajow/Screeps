import { isLowOnEnergyUpgrader } from './creep-utilities';
import { isDamaged, isNotFullExtension, isNotFullTower } from './structure-utilities';
import { isNotEmpty } from './tombstone-utilities';

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

export function hasResourcesToScavenge(room: Room): boolean {
    const droppedResources = room.find(FIND_DROPPED_RESOURCES);
    if (droppedResources.length > 0) {
        return true;
    }
    const tombstones = room.find(FIND_TOMBSTONES, { filter: isNotEmpty });
    return tombstones.length > 0;
}

export function findDamagedStructures(room: Room): Structure[] {
    return room.find(FIND_STRUCTURES, { filter: isDamaged });
}
