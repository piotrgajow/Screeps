import { ErrorMapper } from '_error-mapper/ErrorMapper';

import { MEMORY } from './enums/memory';

import { Logger } from './logging/logger';

import { CreepCommanding } from './main-systems/creep-commanding';
import { CreepSpawning } from './main-systems/creep-spawning';
import { MemoryCleanup } from './main-systems/memory-cleanup';
import { executeTowerCommandingSystem } from './main-systems/tower-commanding';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    Logger.debug(Memory[MEMORY.DEBUG], '-'.repeat(25));
    executeTowerCommandingSystem();
    CreepCommanding.execute();
    CreepSpawning.execute();
    MemoryCleanup.execute();
});
