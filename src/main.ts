import { ErrorMapper } from "utils/ErrorMapper";
import { MemoryCleanup } from './memory-cleanup';
import { CreepSpawning } from './creep-spawning';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    CreepSpawning.execute();
    MemoryCleanup.execute();
});
