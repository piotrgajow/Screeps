import { ErrorMapper } from 'utils/ErrorMapper';

import { CreepCommanding } from './creep-commanding';
import { CreepSpawning } from './creep-spawning';
import { DefenceSystem } from './defence-system';
import { MemoryCleanup } from './memory-cleanup';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    DefenceSystem.execute();
    CreepCommanding.execute();
    CreepSpawning.execute();
    MemoryCleanup.execute();
});
