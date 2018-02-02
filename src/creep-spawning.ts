
import { MAIN_SPAWN_NAME } from './common';
import { Logger } from './logging/logger';
import { MEMORY } from './memory';

interface SpawnTarget {
    [role: string]: number;
}

export class CreepSpawning {

    public static execute(): void {
        const spawnOrder = Game.spawns[MAIN_SPAWN_NAME].memory[MEMORY.SPAWN_ORDER];
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
        const DEFINITIONS = {
            'builder': { parts: [WORK, WORK, CARRY, MOVE], name: 'Builder' },
            'energy-distributor': { parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], name: 'Energy Distributor' },
            'harvester': { parts: [WORK, WORK, CARRY, MOVE], name: 'Harvester' },
            'hauler': { parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], name: 'Hauler' },
            'miner': { parts: [MOVE, WORK, WORK, WORK, WORK, WORK], name: 'Miner' },
            'worker': { parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], name: 'Worker' },
        };
        const definition = DEFINITIONS[role];
        Game.spawns[MAIN_SPAWN_NAME].spawnCreep(
            definition.parts,
            `${definition.name}-${CreepSpawning.creepIndex()}`,
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
