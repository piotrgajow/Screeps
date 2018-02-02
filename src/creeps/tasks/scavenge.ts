import { Task } from '../task';

export class Scavenge extends Task<Resource> {

    protected findTargetId(creep: Creep): string {
        const resource = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        return resource ? resource.id : '';
    }

    protected executeTask(creep: Creep, target: Resource): void {
        if (target) {
            if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: Resource): boolean {
        return creep.carry.energy === creep.carryCapacity || !target;
    }

}
