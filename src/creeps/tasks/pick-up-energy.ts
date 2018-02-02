import { Task } from '../task';

export class PickUpEnergy extends Task<StructureStorage> {

    protected findTargetId(creep: Creep): string {
        const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: isStorage }) as StructureStorage;
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: StructureStorage): void {
        if (target) {
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureStorage): boolean {
        const creepIsFull = creep.carry.energy === creep.carryCapacity;
        return creepIsFull || !target;
    }

}

function isStorage(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_STORAGE;
}
