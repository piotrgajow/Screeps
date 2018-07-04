
export function isNotFull(room: Room): boolean {
    return room.energyAvailable < room.energyCapacityAvailable;
}
