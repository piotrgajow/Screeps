import { Task } from '../task';

export class FillExtensions extends Task<StructureExtension> {

    protected findTargetId(creep: Creep): string {
        const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: notFullExtension });
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: StructureExtension): void {
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureExtension): boolean {
        return creep.carry.energy === 0 || !target || target.energy === target.energyCapacity;
    }

}

function notFullExtension(structure: Structure): boolean {
    if (structure.structureType === STRUCTURE_EXTENSION) {
        const extension = structure as StructureExtension;
        return extension.energy < extension.energyCapacity;
    } else {
        return false;
    }
}
