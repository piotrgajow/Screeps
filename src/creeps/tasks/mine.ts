import { findMines, Mine as MineSite } from '../../flags/mine';

import { Task } from '../task';

export class Mine extends Task<MineSite> {

    protected findTargetId(creep: Creep): string {
        const mines = findMines();
        const targetMine = _.find(mines, (it) => !it.hasMiner);
        return targetMine ? targetMine.name : '';
    }

    protected getTarget(id: string): MineSite {
        return new MineSite(Game.flags[id]);
    }

    protected executeTask(creep: Creep, target: MineSite): void {
        if (target.pos.isEqualTo(creep.pos)) {
            creep.harvest(target.source);
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: MineSite): boolean {
        return !target;
    }

}
