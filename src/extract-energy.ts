
import { MEMORY_PATH, MEMORY_TASK } from './constants';

//export function initialize(creep: Creep): void {
//    creep.memory[MEMORY_PATH] = findSourcePath(creep);
//    execute(creep);
//}

export function execute(creep: Creep): void {
    let source = creep.room.find(FIND_SOURCES)[0];
    if (source.energy === 0) {
        source = creep.room.find(FIND_SOURCES)[1];
    }
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory[MEMORY_TASK] = '';
    }
}

//interface PathFinderGoal {
//    pos: RoomPosition;
//    range: number;
//}
//
//function findSourcePath(creep: Creep): PathFinderPath {
//    const sources: Source[] = creep.room.find(FIND_SOURCES);
//    const sourcesWithEnergy = sources.filter((source) => source.energy > 0);
//    const goals = sourcesWithEnergy.map((source) => positionToGoal(source.pos, 1));
//    const result = PathFinder.search(creep.pos, goals);
//    return result;
//}
//
//function positionToGoal(position: RoomPosition, targetRange: number): PathFinderGoal {
//    return {
//        pos: position,
//        range: targetRange,
//    } as PathFinderGoal;
//}
