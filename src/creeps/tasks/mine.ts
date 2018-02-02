import { MEMORY } from '../../enums/memory';

import { Task } from '../task';

export class Mine extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        const mines = getAllMines();
        const minerCreeps = findMinerCreeps();
        const validMines = _.filter(mines, (mineFlagName) => {
            return _.every(minerCreeps, (c) => {
                return c.memory[MEMORY.TARGET] !== mineFlagName;
            }) ;
        });
        const validMineFlags = _.map(validMines, (mineName) => Game.flags[mineName]);
        return creep.pos.findClosestByPath(validMineFlags).name;
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            const source = Game.getObjectById(target.memory[MEMORY.SOURCE]) as Source;
            creep.harvest(source);
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return false;
    }

}

function findMinerCreeps(): Creep[] {
    return _.filter(_.values(Game.creeps), (creep) => creep.memory[MEMORY.ROLE] === 'miner');
}

function getAllMines(): string[] {
    const mineFlags = _.filter(Game.flags, (flag) => flag.name.includes('mine'));
    return _.map(mineFlags, (flag) => flag.name);
}
