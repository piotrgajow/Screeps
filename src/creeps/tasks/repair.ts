import { Task } from '../task';

export class Repair extends Task<Structure> {

    protected findTargetId(creep: Creep): string {
        const structures = creep.room.find(FIND_STRUCTURES, { filter: damagedStructures });
        const target = _.min(structures, (it) => it.hits);
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: Structure): void {
        if (target) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Structure): boolean {
        return creep.carry.energy === 0 || !target || (target.hits === target.hitsMax);
    }

}

function damagedStructures(structure: Structure): boolean {
    return structure.hits < structure.hitsMax;
}
