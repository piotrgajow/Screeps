import { Task } from '../task';

export class FillStorage extends Task<StructureStorage> {

    protected findTargetId(creep: Creep): string {
        const storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: isStorage }) as StructureStorage;
        return storage ? storage.id : '';
    }

    protected executeTask(creep: Creep, target: StructureStorage): void {
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureStorage): boolean {
        return creep.carry.energy === 0;
    }
}

function isStorage(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_STORAGE;
}
