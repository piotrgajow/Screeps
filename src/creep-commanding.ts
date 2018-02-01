import COMMON from './common';

import { CreepRole } from './creeps/creep-role';
import { Idler } from './creeps/idler';
import { Logger } from './logging/logger';

export class CreepCommanding {

    public static execute() {
        const creeps = _.values(Game.creeps) as Creep[];
        creeps
            .map((it) => this.createCreepRole(it))
            .forEach((it) => it.work());
    }

    private static createCreepRole(creep: Creep): CreepRole {
        const roleName = creep.memory[COMMON.MEMORY.CREEP.ROLE];
        const roleClass = COMMON.ROLES[roleName];
        if (roleClass) {
            const roleObject = Object.create(roleClass);
            roleObject.creep = creep;
            return roleObject;
        } else {
            Logger.error(creep.room.name, 'Role', roleName, 'does not exist');
            const roleObject = new Idler();
            roleObject.creep = creep;
            return roleObject;
        }
    }

}
