import { MEMORY } from '../enums/memory';

const LOW_ENERGY_THRESHOLD = 50;

export function isLowOnEnergy(creep: Creep): boolean {
    return creep.carry.energy < LOW_ENERGY_THRESHOLD;
}

export function isEmpty(creep: Creep): boolean {
    return totalResources(creep) === 0;
}

export function isNotFull(creep: Creep): boolean {
    return totalResources(creep) < creep.carryCapacity;
}

export function isUpgrader(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'upgrader';
}

export function isFull(creep: Creep): boolean {
    return totalResources(creep) === creep.carryCapacity;
}

export function isLowOnEnergyUpgrader(creep: Creep): boolean {
    return isUpgrader(creep) && isLowOnEnergy(creep);
}

export function isMiner(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === 'miner';
}

export function getResourceType(creep: Creep): ResourceConstant {
    const pairs = _.pairs(creep.carry);
    const pair = _.find(pairs, isResourceNotZero);
    return pair ? pair[0] : RESOURCE_ENERGY;
}

function totalResources(creep: Creep): number {
    return _.sum(_.values(creep.carry));
}

function isResourceNotZero(resource: any[]): boolean {
    return resource[1] > 0;
}
