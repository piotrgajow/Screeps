import { default as COMMON, MAIN_SPAWN_NAME } from '../common';
import { MEMORY } from '../enums/memory';
import { Logger } from '../logging/logger';

interface SpawnTarget {
    [role: string]: number;
}

export class CreepSpawning {

    public static execute(): void {
        const spawnOrder = Game.spawns[MAIN_SPAWN_NAME].memory[MEMORY.SPAWN_ORDER];

        if (!spawnOrder) {
            Logger.log(Game.spawns[MAIN_SPAWN_NAME].room.name, 'Spawn order not specified!');
            return;
        }

        const existingCreepCount = CreepSpawning.countExistingCreeps();
        Logger.debug(Game.spawns[MAIN_SPAWN_NAME].memory[MEMORY.DEBUG], 'Targets:', JSON.stringify(spawnOrder));
        Logger.debug(
            Game.spawns[MAIN_SPAWN_NAME].memory[MEMORY.DEBUG],
            'Existing creeps:',
            JSON.stringify(existingCreepCount)
        );

        const target = spawnOrder.find((spawnTarget: SpawnTarget) => {
            return (existingCreepCount[_.keys(spawnTarget)[0]] || 0) < _.values(spawnTarget)[0];
        });
        if (target) {
            const roleToBuild = _.keys(target)[0];
            Logger.debug(Game.spawns[MAIN_SPAWN_NAME].memory[MEMORY.DEBUG], 'Spawning:', roleToBuild);
            CreepSpawning.spawn(roleToBuild);
        }
    }

    private static spawn(role: string): void {
        const parts = COMMON.ROLES[role].getParts(Game.spawns[MAIN_SPAWN_NAME].room);
        Game.spawns[MAIN_SPAWN_NAME].spawnCreep(
            parts,
            `${role}-${CreepSpawning.creepIndex()}`,
            { memory: { role, task: '', debug: false, target: '' } },
        );
    }

    private static creepIndex(): number {
        let index = Memory.creepIndex || 0;
        index += 1;
        Memory.creepIndex = index;
        return index;
    }

    private static countExistingCreeps(): object {
        const creeps = _.values(Game.creeps) as Creep[];
        return _.reduce(creeps, (accumulator, creep) => {
            const role = creep.memory[MEMORY.ROLE];
            accumulator[role] = (accumulator[role] || 0) + 1;
            return accumulator;
        }, {});
    }

}
