import { MEMORY } from '../../enums/memory';
import { Logger } from '../../logging/logger';

import { Task } from '../task';

import { isNotFull } from '../../utilities/creep-utilities';
import { findNotOccupiedRemoteMine } from '../../utilities/flag-finders';
import { lookForConstructionSite, lookForContainer } from '../../utilities/position-finders';

const LOW_HITS_THRESHOLD = 100000;

export class MineRemote extends Task<Flag> {

    protected findTargetId(creep: Creep): string {
        const remoteMineFlagName = findNotOccupiedRemoteMine();
        return remoteMineFlagName ? remoteMineFlagName : '';
    }

    protected getTarget(id: string): Flag {
        return Game.flags[id];
    }

    protected executeTask(creep: Creep, target: Flag): void {
        if (target.pos.isEqualTo(creep.pos)) {
            if (isNotFull(creep)) {
                let sourceId = target.memory[MEMORY.SOURCE];
                if (!sourceId) {
                    const sourcesNearby = target.pos.findInRange(FIND_SOURCES, 1);
                    if (sourcesNearby.length === 0) {
                        Logger.error(creep.room.name, 'flag', target.name, 'has no source nearby');
                    } else {
                        sourceId = sourcesNearby[0].id;
                        target.memory[MEMORY.SOURCE] = sourceId;
                    }
                }
                const source = Game.getObjectById(sourceId) as Source;
                creep.harvest(source);
            } else {
                const container = lookForContainer(target.pos);
                if (container) {
                    if (container.hits < LOW_HITS_THRESHOLD) {
                        creep.repair(container);
                    } else {
                        creep.drop(RESOURCE_ENERGY);
                    }
                } else {
                    const constructionSite = lookForConstructionSite(target.pos);
                    if (constructionSite) {
                        creep.build(constructionSite);
                    } else {
                        target.room!.createConstructionSite(target.pos, STRUCTURE_CONTAINER);
                    }
                }
            }
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: Flag): boolean {
        return !target;
    }

}
