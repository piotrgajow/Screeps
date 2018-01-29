
import { Logger } from '../../logging/logger';
import { MEMORY } from '../../memory';
import { isContainer } from '../../structure-filters';

import { Task } from './task';

export class PickFromContainer extends Task {

    private readonly FILL_THRESHOLD = 1500;

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = this.findContainerId(creep);
    }

    protected executeTask(creep: Creep): any {
        const container = Game.getObjectById(creep.memory[MEMORY.TARGET]) as StructureContainer;
        if (!container) {
            return {};
        }

        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
        return { container };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        const isCreepFull = creep.carry.energy === creep.carryCapacity;
        const isContainerEmpty = opts.container && opts.container.store.energy === 0;
        return isCreepFull || isContainerEmpty;
    }

    private findContainerId(creep: Creep): string {
        const containers = creep.room.find(FIND_STRUCTURES, { filter: isContainer } ) as StructureContainer[];
        const filled = _.filter(containers, (it) => it.store.energy > this.FILL_THRESHOLD);
        if (filled.length) {
            return PickFromContainer.selectClosest(creep.pos, filled).id;
        } else if (containers.length) {
            return PickFromContainer.selectClosest(creep.pos, containers).id;
        } else {
            Logger.error(creep.room.name, 'No container to get energy from for creep', creep);
            return '';
        }
    }

    private static selectClosest(position: RoomPosition, objects: any): any {
        return position.findClosestByRange(objects);
    }

}
