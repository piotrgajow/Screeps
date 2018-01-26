import COMMON from './common';

import { CreepRole } from './creeps/creep-role';

export class CreepCommanding {

    public static execute() {
        Object.keys(Game.creeps)
            .map((it) => this.createCreepRole(it))
            .forEach((it) => it.work());
    }

    private static createCreepRole(name: string): CreepRole {
        const creep = Game.creeps[name];
        const roleName = creep.memory[COMMON.MEMORY.CREEP.ROLE];
        const roleClass = COMMON.ROLES[roleName];
        const roleObject = Object.create(roleClass);
        roleObject.creep = creep;
        return roleObject;
    }

}
