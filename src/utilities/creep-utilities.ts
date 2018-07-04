import { MEMORY } from '../enums/memory';

const LOW_ENERGY_THRESHOLD = 50;

export function isLowOnEnergy(creep: Creep): boolean {
    return creep.carry.energy < LOW_ENERGY_THRESHOLD;
}

export function isEmpty(creep: Creep): boolean {
    return creep.carry.energy === 0;
}

export function isNotFull(creep: Creep): boolean {
    return creep.carry.energy < creep.carryCapacity;
}

export function isUpgrader(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'upgrader';
}

export function isFull(creep: Creep): boolean {
    return creep.carry.energy === creep.carryCapacity;
}

export function hasSomeEnergy(creep: Creep): boolean {
    return creep.carry.energy > 0;
}

export function isLowOnEnergyUpgrader(creep: Creep): boolean {
    return isUpgrader(creep) && isLowOnEnergy(creep);
}

export function isMiner(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'miner';
}
