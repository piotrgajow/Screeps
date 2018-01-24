import { MAIN_SPAWN, MEMORY_ROLE, MEMORY_TASK } from './constants';
import * as ExtractEnergy from './extract-energy';
import * as FillSpawn from './fill-spawn';
import * as UpgradeController from './upgrade-controller';

export class CreepCommanding {

    public static execute() {
        Object.keys(Game.creeps).map((it) => Game.creeps[it]).forEach((it) => {
            const role = it.memory[MEMORY_ROLE];
            if (role === 'harvester') {
                if (!it.memory[MEMORY_TASK]) {
                    if (it.carry.energy === it.carryCapacity) {
                        if (Game.spawns[MAIN_SPAWN].energy === Game.spawns[MAIN_SPAWN].energyCapacity) {
                            it.memory[MEMORY_TASK] = 'upgrade-controller';
                        } else {
                            it.memory[MEMORY_TASK] = 'fill-spawn';
                        }
                    } else {
                        it.memory[MEMORY_TASK] = 'extract-energy';
                    }
                }
                console.log(it.memory[MEMORY_TASK]);
                switch (it.memory[MEMORY_TASK]) {
                    case 'extract-energy':
                        ExtractEnergy.execute(it);
                        break;
                    case 'fill-spawn':
                        FillSpawn.execute(it);
                        break;
                    case 'upgrade-controller':
                        UpgradeController.execute(it);
                        break;
                    default:
                        console.log(`Behaviour for task ${it.memory[MEMORY_TASK]} is undefined`);
                }
            } else if (role) {
                console.error(`${it.name} has unsupported role ${role}`);
            } else {
                console.error(`${it.name} has no role assigned!`);
            }
        });
    }

}
