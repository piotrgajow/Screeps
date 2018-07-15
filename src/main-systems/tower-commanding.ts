import { isTower } from '../utilities/structure-utilities';

const THRESHOLD = 1000000;

export function executeTowerCommandingSystem(): void {
    const towers = _.filter(_.values(Game.structures), isTower) as StructureTower[];
    _.forEach(towers, executeTowerTasks);
}

function executeTowerTasks(tower: StructureTower): void {
    const enemies = tower.room.find(FIND_HOSTILE_CREEPS) as Creep[];
    if (enemies.length > 0) {
        defendRoom(tower, enemies);
    } else if (tower.energy > tower.energyCapacity / 2) {
        repairStructures(tower);
    }
}

function defendRoom(tower: StructureTower, enemies: Creep[]): void {
    const closestEnemy = tower.pos.findClosestByRange(enemies)!;
    tower.attack(closestEnemy);
}

function repairStructures(tower: StructureTower): void {
    const structureToRepair = _.find(_.values(Game.structures), (structure: Structure) => {
        return structure.hits < structure.hitsMax && structure.hits < THRESHOLD;
    }) as Structure;
    tower.repair(structureToRepair);
}
