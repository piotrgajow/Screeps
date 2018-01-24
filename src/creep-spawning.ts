
import { MAIN_SPAWN } from './constants';

export class CreepSpawning {

    public static execute(): void {
        if (Object.keys(Game.creeps).length < 5) {
            Game.spawns[MAIN_SPAWN].spawnCreep(
                [WORK, WORK, CARRY, MOVE],
                `Harvester${CreepSpawning.creepIndex()}`,
                { memory: { role: 'harvester' } }
            );
        }
    }

    private static creepIndex(): number {
        let index = Memory.creepIndex || 0;
        index += 1;
        Memory.creepIndex = index;
        return index;
    }

}
