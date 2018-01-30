import { MEMORY } from '../../memory';

import { Task } from './task';

export class Mine extends Task {

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = this.findTarget(creep);
    }

    protected executeTask(creep: Creep): void {
        const mineFlag = Game.flags[creep.memory[MEMORY.TARGET]];
        if (mineFlag.pos.isEqualTo(creep.pos)) {
            const source = Game.getObjectById(mineFlag.memory[MEMORY.SOURCE]) as Source;
            creep.harvest(source);
        } else {
            creep.moveTo(mineFlag);
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return false;
    }

    private findTarget(creep: Creep): string {
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

}

function findMinerCreeps(): Creep[] {
    return _.filter(_.values(Game.creeps), (creep) => creep.memory[MEMORY.ROLE] === 'miner');
}

function getAllMines(): string[] {
    return Memory.mines;
}
