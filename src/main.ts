import { ErrorMapper } from 'utils/ErrorMapper';

import { CreepCommanding } from './creep-commanding';
import { CreepSpawning } from './creep-spawning';
import { MemoryCleanup } from './memory-cleanup';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    CreepCommanding.execute();
    CreepSpawning.execute();
    MemoryCleanup.execute();
});
