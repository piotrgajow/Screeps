import { findRemoteMines, RemoteMine } from '../../flags/remote-mine';

import { isFull } from '../../utilities/creep-utilities';
import { isEmpty, isNotEmptyContainer } from '../../utilities/structure-utilities';

import { Task } from '../task';

export class PickFromRemoteMine extends Task<StructureContainer> {

    protected findTargetId(creep: Creep): string {
        const remoteMines: RemoteMine[] = findRemoteMines();
        const targetMine = _.find(remoteMines, (it: RemoteMine) => {
            return !it.hauler && it.container && isNotEmptyContainer(it.container);
        });
        return targetMine ? targetMine.container!.id : '';
    }

    protected executeTask(creep: Creep, target: StructureContainer): any {
        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureContainer): boolean {
        return isFull(creep) || !target || isEmpty(target);
    }

}
