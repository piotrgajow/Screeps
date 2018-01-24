import { ErrorMapper } from 'utils/ErrorMapper';

import { CreepSpawning } from './creep-spawning';
import { MemoryCleanup } from './memory-cleanup';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    CreepSpawning.execute();
    MemoryCleanup.execute();
});


//let i = 1;
//
//module.exports.loop = function () {
//
//    Object.keys(Game.creeps).map((it) => Game.creeps[it]).forEach((it) => harvestEnergy(it));
//}
//
//function mainSpawn() {
//    return Game.spawns['Spawn1'];
//}
//
//function harvestEnergy(creep) {
//    // findSource(creep);
//    let source = creep.room.find(FIND_SOURCES)[0]
//    if (source.energy === 0) {
//        source = creep.room.find(FIND_SOURCES)[1]
//    }
//    if(creep.carry.energy === creep.carryCapacity) {
//        if (mainSpawn().energy >= 300) {
//            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
//                creep.moveTo(creep.room.controller);
//            }
//        } else {
//            if (creep.transfer(mainSpawn(), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                creep.moveTo(mainSpawn());
//            }
//        }
//    } else {
//        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
//            creep.moveTo(source);
//        }
//    }
//}
//
//function findSource(creep) {
//    const sources = creep.room.find(FIND_SOURCES);
//    sources.forEach((source) => {
//        console.log(PathFinder.search(creep, source).cost);
//    })
//
//}
