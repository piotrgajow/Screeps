import { ErrorMapper } from '_error-mapper/ErrorMapper';

import { CreepCommanding } from './main-systems/creep-commanding';
import { CreepSpawning } from './main-systems/creep-spawning';
import { DefenceSystem } from './main-systems/defence-system';
import { MemoryCleanup } from './main-systems/memory-cleanup';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    DefenceSystem.execute();
    CreepCommanding.execute();
    CreepSpawning.execute();
    MemoryCleanup.execute();
});
