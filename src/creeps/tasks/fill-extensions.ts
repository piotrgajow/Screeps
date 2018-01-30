import { Task } from './task';

import { ROOM } from '../../room-utils';

export class FillExtensions extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): any {
        const target = ROOM.findExtensions(creep.room).find((extension) => {
            return extension.energy < extension.energyCapacity;
        });

        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: {} });
            }
        }
    }

    protected isTaskFinished(creep: Creep, target: any): boolean {
        return creep.carry.energy === 0 || !target;
    }

}
