import { Task } from '../task';

export class UpgradeController extends Task<StructureController> {

    protected findTargetId(creep: Creep): string {
        return creep.room.name;
    }

    protected getTarget(id: string): StructureController {
        return Game.rooms[id].controller as StructureController;
    }

    protected executeTask(creep: Creep, target: StructureController): void {
        if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: StructureController): boolean {
        return creep.carry.energy === 0;
    }

}
