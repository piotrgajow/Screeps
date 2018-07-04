import { CreepRole } from '../creep-role';

export class Upgrader extends CreepRole {

    protected findNewTask(): string {
        return 'upgrade';
    }

}
