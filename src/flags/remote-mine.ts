
import { findCreep, isRemoteHauler, isTargeting } from '../utilities/creeps';
import { isStructure } from '../utilities/look-utilities';
import { isContainer } from '../utilities/structure-utilities';

const REMOTE_MINE_PREFIX = 'remote-mine';

export class RemoteMine {

    constructor(
        private flag: Flag,
    ) {
    }

    get container(): StructureContainer | undefined {
        const containerResult = _.find(this.flag.pos.look(), isContainerStructure) as LookAtResult<LOOK_STRUCTURES>;
        return _.get(containerResult, 'structure') as StructureContainer;
    }

    get hauler(): Creep | undefined {
        return findCreep(isRemoteHauler, isTargeting(this.flag.name));
    }

}

export function findRemoteMines(): RemoteMine[] {
    const flags = _.filter(Game.flags, isRemoteMine);
    return _.map(flags, (it) => new RemoteMine(it));
}

function isRemoteMine(flag: Flag): boolean {
    return flag.name.includes(REMOTE_MINE_PREFIX);
}

function isContainerStructure(it: LookAtResult<LookConstant>): boolean {
    return isStructure(it) && isContainer(it.structure as Structure);
}
