
import { findCreep, isRemoteHauler, isTargeting } from '../utilities/creeps';
import { isStructure } from '../utilities/look-utilities';
import { isContainer } from '../utilities/structure-utilities';

const REMOTE_MINE_PREFIX = 'remote-mine';

export class RemoteMine extends Flag {

    get container(): StructureContainer | undefined {
        const containerResult = _.find(this.pos.look(), isContainerStructure) as LookAtResult<LOOK_STRUCTURES>;
        return _.get(containerResult, 'structure') as StructureContainer;
    }

    get hauler(): Creep | undefined {
        return findCreep(isRemoteHauler, isTargeting(this.name));
    }

}

export function findRemoteMines(): RemoteMine[] {
    return _.filter(Game.flags, isRemoteMine) as RemoteMine[];
}

function isRemoteMine(flag: Flag): boolean {
    return flag.name.includes(REMOTE_MINE_PREFIX);
}

function isContainerStructure(it: LookAtResult<LookConstant>): boolean {
    return isStructure(it) && isContainer(it.structure as Structure);
}
