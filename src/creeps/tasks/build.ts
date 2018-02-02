import { Task } from '../task';

export class Build extends Task<ConstructionSite> {

    protected findTargetId(creep: Creep): string {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        return target ? target.id : '';
    }

    protected executeTask(creep: Creep, target: ConstructionSite): void {
        if (target) {
            if (creep.build(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: ConstructionSite): boolean {
        return creep.carry.energy === 0 || !target;
    }

}
