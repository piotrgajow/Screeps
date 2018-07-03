type StructureWithEnergy = StructureSpawn | StructureTower | StructureExtension;
type StructureWithStorage = StructureContainer;

const HIGH_ENERGY_THRESHOLD = 1000;

export function isTower(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_TOWER;
}

export function isExtension(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_EXTENSION;
}

export function isStorage(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_STORAGE;
}

export function isContainer(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}

export function isNotFull(structure: StructureWithEnergy): boolean {
    return structure.energy < structure.energyCapacity;
}

export function isFull(structure: StructureWithEnergy): boolean {
    return structure.energy === structure.energyCapacity;
}

export function isHighOnEnergy(structure: StructureWithStorage): boolean {
    return structure.store.energy > HIGH_ENERGY_THRESHOLD;
}

export function isNotEmpty(structure: StructureWithStorage): boolean {
    return structure.store.energy > 0;
}

export function isEmpty(structure: StructureWithStorage): boolean {
    return structure.store.energy === 0;
}

export function isDamaged(structure: Structure): boolean {
    return structure.hits < structure.hitsMax;
}

export function isIntact(structure: Structure): boolean {
    return structure.hits === structure.hitsMax;
}

// compositions

export function isNotFullTower(structure: Structure): boolean {
    return isTower(structure) && isNotFull(structure as StructureTower);
}

export function isNotFullExtension(structure: Structure): boolean {
    return isExtension(structure) && isNotFull(structure as StructureExtension);
}

export function isHighOnEnergyContainer(structure: Structure): boolean {
    return isContainer(structure) && isHighOnEnergy(structure as StructureContainer);
}

export function isNotEmptyContainer(structure: Structure): boolean {
    return isContainer(structure) && isNotEmpty(structure as StructureContainer);
}
