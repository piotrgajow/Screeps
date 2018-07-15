import { default as COMMON, MAIN_SPAWN_NAME } from '../common';
import { MEMORY } from '../enums/memory';
import { Logger } from '../logging/logger';

interface SpawnTarget {
    [role: string]: number;
}

export class CreepSpawning {

    public static execute(): void {
        const spawn = Game.spawns[MAIN_SPAWN_NAME];

        if (spawn.room.energyAvailable <= 300 && _.values(Game.creeps).length === 0) {
            Logger.error(spawn.room.name, 'Spawning emergency worker');
            CreepSpawning.spawn('worker');
            return;
        }

        const spawnOrder = spawn.memory[MEMORY.SPAWN_ORDER];

        if (!spawnOrder) {
            Logger.log(spawn.room.name, 'Spawn order not specified!');
            return;
        }

        const existingCreepCount = CreepSpawning.countExistingCreeps();
        Logger.debug(spawn.memory[MEMORY.DEBUG], 'Targets:', JSON.stringify(spawnOrder));
        Logger.debug(
            spawn.memory[MEMORY.DEBUG],
            'Existing creeps:',
            JSON.stringify(existingCreepCount)
        );

        const target = spawnOrder.find((spawnTarget: SpawnTarget) => {
            return (existingCreepCount[_.keys(spawnTarget)[0]] || 0) < _.values(spawnTarget)[0];
        });
        if (target) {
            const roleToBuild = _.keys(target)[0];
            Logger.debug(spawn.memory[MEMORY.DEBUG], 'Spawning:', roleToBuild);
            CreepSpawning.spawn(roleToBuild);
        }
    }

    private static spawn(role: string): void {
        const spawn = Game.spawns[MAIN_SPAWN_NAME];
        const parts = COMMON.ROLES[role].getParts(spawn.room);
        const memory = {
            debug: false,
            role,
            room: spawn.room.name,
            target: '',
            task: '',
        };
        const name = `${role}-${CreepSpawning.creepIndex()}`;

        spawn.spawnCreep(parts, name, { memory });
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
