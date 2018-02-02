import { isTower } from '../structure-filters';

export class DefenceSystem {

    public static execute(): void {
        const spawns = _.values(Game.spawns) as StructureSpawn[];
        _.forEach(spawns, defendSpawn);
    }

}

function defendSpawn(spawn: StructureSpawn): void {
    const towers = spawn.room.find(FIND_MY_STRUCTURES, { filter: isTower }) as StructureTower[];
    _.forEach(towers, _.partial(towerDefendSpawn, spawn));
}

function towerDefendSpawn(spawn: StructureSpawn, tower: StructureTower): void {
    const enemies = spawn.room.find(FIND_HOSTILE_CREEPS) as Creep[];
    if (enemies && enemies.length) {
        const closestEnemy = spawn.pos.findClosestByRange(enemies);
        tower.attack(closestEnemy);
    }
}

