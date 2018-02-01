import { CreepRole } from './creep-role';

export class Idler extends CreepRole {

    protected findNewTask(): string {
        return 'no-op';
    }

}
