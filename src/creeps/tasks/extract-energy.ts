import { Task } from './task';

export class ExtractEnergy extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): void {
        let source = creep.room.find(FIND_SOURCES)[0];
        if (source.energy === 0) {
            source = creep.room.find(FIND_SOURCES)[1];
        }
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return creep.carry.energy === creep.carryCapacity
    }
}

//export function initialize(creep: Creep): void {
//    creep.memory[MEMORY_PATH] = findSourcePath(creep);
//    execute(creep);
//}

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
