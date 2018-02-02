import { Task } from '../task';

export class UpgradeController extends Task {

    public initialize(creep: Creep): void {
    }

    protected executeTask(creep: Creep): void {
        if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return creep.carry.energy === 0;
    }

}
