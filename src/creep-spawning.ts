
export class CreepSpawning {

    static execute(): void {
        if (Object.keys(Game.creeps).length < 5) {
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], `Harvester${creepIndex()}`);
        }
    }

    private static creepIndex(): number {
        let index = Memory.creepIndex || 0;
        index += 1;
        Memory.creepIndex = index;
        return index;
    }

}
