
import COMMON from './common';

export class CreepSpawning {

    public static execute(): void {
        if (Object.keys(Game.creeps).length < 5) {
            COMMON.MAIN_SPAWN.spawnCreep(
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
