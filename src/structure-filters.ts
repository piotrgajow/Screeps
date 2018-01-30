
export function isContainer(structure: any): boolean {
    return structure.structureType === STRUCTURE_CONTAINER;
}

export function isMineFlag(flag: Flag): boolean {
    return flag.name.includes('mine');
}
