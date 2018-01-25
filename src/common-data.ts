import { UpgradeController } from './creeps/upgrade-controller';
import { Task } from './creeps/task';

class CommonData {

    TASKS: { [s: string]: Task; } = {
        'upgrade-controller': new UpgradeController(),
    };

    constructor() {
        console.log('creating common data');
    }

}

const COMMON_DATA = new CommonData();

export default COMMON_DATA;



