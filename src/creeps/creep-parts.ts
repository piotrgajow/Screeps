
export const CREEP_PART_PRICES = {
    [ATTACK]: 80,
    [CARRY]: 50,
    [CLAIM]: 600,
    [HEAL]: 250,
    [MOVE]: 50,
    [RANGED_ATTACK]: 150,
    [TOUGH]: 10,
    [WORK]: 100,
};

export function checkCombinationFit(parts: BodyPartConstant[], availableEnergy: number): number {
    const partsTotalCost = parts.reduce((intermediate, current) => intermediate + CREEP_PART_PRICES[current], 0);
    return availableEnergy / partsTotalCost;
}
