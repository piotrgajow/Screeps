
import COMMON from './common';

export class CreepSpawning {

    public static execute(): void {
        const TARGETS = {
            builder: 2,
            harvester: 0,
            hauler: 1,
            miner: 2,
            worker: 4,
        };

        const creepRoleCounts = Object.keys(Game.creeps)
            .map((it) => Game.creeps[it])
            .reduce((iter, current) => {
                const role = current.memory[COMMON.MEMORY.CREEP.ROLE];
                iter[role] = iter[role] + 1;
                return iter;
            }, { builder: 0, harvester: 0, hauler: 0, miner: 0, worker: 0 });

        const roleToBuild = Object.keys(TARGETS).find((role) => {
            return creepRoleCounts[role] < TARGETS[role];
        });
        if (roleToBuild) {
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
