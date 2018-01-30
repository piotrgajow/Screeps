import { Logger } from '../../logging/logger';
import { MEMORY } from '../../memory';
import { isMineFlag } from '../../structure-filters';

import { Task } from './task';

export class Mine extends Task {

    public initialize(creep: Creep): void {
        creep.memory[MEMORY.TARGET] = Mine.findMineContainerId(creep);
    }

    protected executeTask(creep: Creep): any {
        const mine = Game.getObjectById(creep.memory[MEMORY.TARGET]) as Structure;
        creep.moveTo(mine);
        return { mine };
    }

    protected isTaskFinished(creep: Creep, opts: any): boolean {
        return creep.pos.toString() === opts.mine.pos.toString();
    }

    private static findMineContainerId(creep: Creep): string {
        const mineFlags = creep.room.find(FIND_FLAGS, { filter: isMineFlag }) as Flag[];
        const minerCreeps = _.transform(Game.creeps, creepMinerTransform, []) as Creep[];
        const validMines = findValidMines(creep.room, mineFlags, minerCreeps);
        switch (validMines.length) {
            case 0:
                Logger.error(creep.room.name, 'No empty mine found');
                return '';
            case 1:
                return validMines[0].id;
            default:
                return creep.pos.findClosestByRange(validMines).id;
        }
    }

}

function findValidMines(room: Room, mineFlags: Flag[], minerCreeps: Creep[]): StructureContainer[] {
    return _.reduce(mineFlags, (accumulator: StructureContainer[], flag: Flag) => {
        const findResult = _.find(flag.pos.look(), (obj) => {
            if (obj.type === 'structure') {
                return obj.structure && obj.structure.structureType === STRUCTURE_CONTAINER;
            }
            return false;
        });
        if (findResult) {
            const container = findResult.structure as StructureContainer;
            const containerIsAlreadyAssigned = _.some(minerCreeps, (creep) => {
                return creep.memory[MEMORY.TARGET] === container.id;
            });
            if (!containerIsAlreadyAssigned) {
                accumulator.push(container);
            }
            return accumulator;
        } else {
            Logger.error(room.name, 'There is no container in position of mine flat', flag.name);
            return accumulator;
        }
    }, []);
}

function creepMinerTransform(accumulator: Creep[], creep: Creep) {
    if (creep.memory[MEMORY.ROLE] === 'miner') {
        accumulator.push(creep);
    }
    return accumulator;
}
