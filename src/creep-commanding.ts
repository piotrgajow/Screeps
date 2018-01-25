import { CreepRole } from './creeps/creep-role';

export class CreepCommanding {

    public static execute() {
        Object.keys(Game.creeps)
            .map((it) => new CreepRole(Game.creeps[it]))
            .forEach((it) => it.work());
    }

}
