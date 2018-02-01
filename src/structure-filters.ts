
export function isContainer(structure: any): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}

export function isTower(structure: any): boolean {
    return structure.structureType === STRUCTURE_TOWER;
}
