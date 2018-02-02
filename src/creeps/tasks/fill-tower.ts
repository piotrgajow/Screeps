import { Task } from '../task';

export class FillTower extends Task<StructureTower> {

    protected findTargetId(creep: Creep): string {
        const tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: isNotFullTower });
        return tower ? tower.id : '';
    }

    protected executeTask(creep: Creep, target: StructureTower): void {
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureTower): boolean {
        return creep.carry.energy === 0 || !target || target.energy === target.energyCapacity;
    }

}

function isNotFullTower(structure: Structure): boolean {
    if (structure.structureType !== STRUCTURE_TOWER) {
         return false;
    }
    const tower = structure as StructureTower;
    return tower.energy < tower.energyCapacity;
}
