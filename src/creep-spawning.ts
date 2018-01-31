
import COMMON from './common';
import { Logger } from './logging/logger';
import { MEMORY } from './memory';

export class CreepSpawning {

    private static readonly PRIORITIES = ['harvester', 'miner', 'hauler'];

    public static execute(): void {
        const targets = COMMON.MAIN_SPAWN.memory[MEMORY.TARGETS];
        const creeps = _.values(Game.creeps) as Creep[];
        const existingCreepCount = _.reduce(creeps, (accumulator, creep) => {
            const role = creep.memory[MEMORY.ROLE];
            accumulator[role] = (accumulator[role] || 0) + 1;
            return accumulator;
        }, {});
        Logger.debug(COMMON.MAIN_SPAWN.memory[MEMORY.DEBUG], 'Existing creeps:', JSON.stringify(existingCreepCount));
        Logger.debug(COMMON.MAIN_SPAWN.memory[MEMORY.DEBUG], 'Targets:', JSON.stringify(targets));

        const roleCheckOrder = _.union(CreepSpawning.PRIORITIES, _.keys(COMMON.ROLES));
        const roleToBuild = roleCheckOrder.find((role) => {
            return (existingCreepCount[role] || 0) < (targets[role] || 0);
        });
        if (roleToBuild) {
            Logger.debug(COMMON.MAIN_SPAWN.memory[MEMORY.DEBUG], 'Spawning:', roleToBuild);
            CreepSpawning.spawn(roleToBuild);
        }
    }

    private static spawn(role: string): void {
        const DEFINITIONS = {
            builder: { parts: [WORK, WORK, CARRY, MOVE], name: 'Builder' },
            harvester: { parts: [WORK, WORK, CARRY, MOVE], name: 'Harvester' },
            hauler: { parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], name: 'Hauler' },
            miner: { parts: [MOVE, WORK, WORK, WORK, WORK, WORK], name: 'Miner' },
            worker: { parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], name: 'Worker' },
        };
        const definition = DEFINITIONS[role];
        COMMON.MAIN_SPAWN.spawnCreep(
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

}
