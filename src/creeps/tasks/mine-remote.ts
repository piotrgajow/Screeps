import { MEMORY } from '../../enums/memory';
import { Logger } from '../../logging/logger';

import { Task } from '../task';

import { findRemoteMines, RemoteMine } from '../../flags/remote-mine';

import { isNotFull } from '../../utilities/creep-utilities';
import { lookForConstructionSite, lookForContainer } from '../../utilities/position-finders';

const LOW_HITS_THRESHOLD = 100000;

export class MineRemote extends Task<RemoteMine> {

    protected findTargetId(creep: Creep): string {
        const remoteMines = findRemoteMines();
        const targetMine = _.find(remoteMines, (it) => !it.hasMiner);
        return targetMine ? targetMine.name : '';
    }

    protected getTarget(id: string): RemoteMine {
        return new RemoteMine(Game.flags[id]);
    }

    protected executeTask(creep: Creep, target: RemoteMine): void {
        if (target.pos.isEqualTo(creep.pos)) {
            if (isNotFull(creep)) {
                const source = target.source;
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
                        target.room.createConstructionSite(target.pos, STRUCTURE_CONTAINER);
                    }
                }
            }
        } else {
            creep.moveTo(target, { visualizePathStyle: {} });
        }
    }

    protected isTaskFinished(creep: Creep, target: RemoteMine): boolean {
        return !target;
    }

}
