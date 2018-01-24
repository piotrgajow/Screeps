
export class CreepSpawning {
    private static readonly MAIN_SPAWN = 'Spawn1';

    public static execute(): void {
        if (Object.keys(Game.creeps).length < 5) {
            Game.spawns[CreepSpawning.MAIN_SPAWN].spawnCreep(
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
