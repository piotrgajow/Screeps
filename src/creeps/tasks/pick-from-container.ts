
import { Task } from '../task';

export class PickFromContainer extends Task<StructureContainer> {

    protected findTargetId(creep: Creep): string {
        const containers = creep.room.find(FIND_STRUCTURES, { filter: containersWithEnergy });
        const filled = _.filter(containers, filledWithEnergy);
        if (filled.length) {
            return selectClosest(creep.pos, filled).id;
        } else if (containers.length) {
            return selectClosest(creep.pos, containers).id;
        } else {
            return '';
        }
    }

    protected executeTask(creep: Creep, target: StructureContainer): any {
        if (target) {
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureContainer): boolean {
        const isCreepFull = creep.carry.energy === creep.carryCapacity;
        const isContainerEmpty = target && target.store.energy === 0;
        return isCreepFull || isContainerEmpty;
    }

}

const HIGH_THRESHOLD = 1000;
const LOW_THRESHOLD = 100;

function containersWithEnergy(structure: Structure): boolean {
    if (structure.structureType === STRUCTURE_CONTAINER) {
        const container = structure as StructureContainer;
        return container.store.energy > LOW_THRESHOLD;
    } else {
        return false;
    }
}

function filledWithEnergy(container: StructureContainer): boolean {
    return container.store.energy > HIGH_THRESHOLD;
}

function selectClosest(position: RoomPosition, objects: any): any {
    return position.findClosestByRange(objects);
}
