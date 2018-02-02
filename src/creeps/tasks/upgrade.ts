import { MEMORY } from '../../enums/memory';

import { Task } from '../task';

export class Upgrade extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        const upgradeSites = getAllUpgradeSites();
        const upgraderCreeps = findUpgraderCreeps();
        const validUpgradeSites = _.filter(upgradeSites, (flagName) => {
            return _.every(upgraderCreeps, (c) => {
                return c.memory[MEMORY.TARGET] !== flagName;
            }) ;
        });
        const validFlags = _.map(validUpgradeSites, (name) => Game.flags[name]);
        return creep.pos.findClosestByPath(validFlags).name;
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            if (creep.carry.energy > 0) {
                creep.upgradeController(creep.room.controller as StructureController);
            }
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep): boolean {
        return false;
    }

}

function getAllUpgradeSites(): string[] {
    const upgradeSiteFlags = _.filter(Game.flags, (flag) => flag.name.includes('upg'));
    return _.map(upgradeSiteFlags, (flag) => flag.name);
}

function findUpgraderCreeps(): Creep[] {
    return _.filter(_.values(Game.creeps), (creep) => creep.memory[MEMORY.ROLE] === 'upgrader');
}
