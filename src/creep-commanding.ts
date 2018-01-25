import { MEMORY_ROLE } from './constants';
import { CreepRole } from './creeps/creep-role';

export class CreepCommanding {

    public static execute() {
        Object.keys(Game.creeps)
            .map((it) => Game.creeps[it])
            .forEach((it) => {
                const role = it.memory[MEMORY_ROLE];
                if (role === 'harvester') {
                    new CreepRole(it).work();
                } else if (role) {
                    console.error(`${it.name} has unsupported role ${role}`);
                } else {
                    console.error(`${it.name} has no role assigned!`);
                }
            });
    }

}
