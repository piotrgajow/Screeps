import { Logger } from '../../logging/logger';
import { ROOM } from '../../room-utils';

import { Task } from './task';

export class FillStorage extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): object {
        const storage = ROOM.findStorage(creep.room);
        if (!storage) {
            Logger.error(creep.room.name, 'No storage in room');
            return {};
        }

        if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
        return {};
    }

    protected isTaskFinished(creep: Creep, opts: object): boolean {
        const creepHasNoMoreEnergy = creep.carry.energy === 0;
        return creepHasNoMoreEnergy;
    }
}
