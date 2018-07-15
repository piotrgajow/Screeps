import { REMOTE_HAULER } from '../creeps/roles/remote-hauler';

import { MEMORY } from '../enums/memory';

export function findCreep(...filters: Array<(creep: Creep) => boolean>): Creep | undefined {
    const allCreeps: Creep[] = _.values(Game.creeps);
    const filter = _.flow(...filters);
    return _.find(allCreeps, filter);
}

export function isRemoteHauler(creep: Creep): boolean {
    return creep.memory[MEMORY.ROLE] === REMOTE_HAULER;
}

export function isTargeting(target: string): (creep: Creep) => boolean {
    return (creep: Creep) => creep.memory[MEMORY.TARGET] === target;
}
