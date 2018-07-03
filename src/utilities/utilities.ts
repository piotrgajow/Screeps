import { MEMORY } from '../enums/memory';

type ObjectWithEnergy = StructureSpawn | StructureTower | StructureExtension;

const LOW_ENERGY_THRESHOLD = 50;

export function creepIsNotFull(creep: Creep): boolean {
    return creep.carry.energy < creep.carryCapacity;
}

export function isNotFull(object: ObjectWithEnergy): boolean {
    return object.energy < object.energyCapacity;
}

export function roomIsNotFull(room: Room): boolean {
    return room.energyAvailable < room.energyCapacityAvailable;
}

export function isTower(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_TOWER;
}

export function isNotFullTower(structure: Structure): boolean {
    return isTower(structure) && isNotFull(structure as StructureTower);
}

export function isExtension(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_EXTENSION;
}

export function isNotFullExtension(structure: Structure): boolean {
    return isExtension(structure) && isNotFull(structure as StructureExtension);
}

export function isUpgrader(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'upgrader';
}

export function isLowOnEnergy(creep: Creep): boolean {
    return creep.carry.energy < LOW_ENERGY_THRESHOLD;
}

export function hasNoEnergy(creep: Creep): boolean {
    return creep.carry.energy === 0;
}

export function hasSomeEnergy(creep: Creep): boolean {
    return creep.carry.energy > 0;
}

export function isLowOnEnergyUpgrader(creep: Creep): boolean {
    return isUpgrader(creep) && isLowOnEnergy(creep);
}
