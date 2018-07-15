import { REMOTE_HAULER } from '../creeps/roles/remote-hauler';

import { MEMORY } from '../enums/memory';

export function findCreep(...filters: Array<(creep: Creep) => boolean>): Creep | undefined {
    const allCreeps: Creep[] = _.values(Game.creeps);

    const filter = (creep: Creep) => {
        let result = true;
        _.each(filters, (it) => {
            result = result && it(creep);
        });
        return result;
    };

    return _.find(allCreeps, filter);
}

export function isRemoteHauler(creep: Creep): boolean {
    return creep && creep.memory[MEMORY.ROLE] === REMOTE_HAULER;
}

export function isTargeting(target: string): (creep: Creep) => boolean {
    return (creep: Creep) => {
        return creep && creep.memory[MEMORY.TARGET] === target;
    };
}
