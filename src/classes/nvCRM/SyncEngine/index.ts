import { nvCRMi } from '../setup';

import resolver from './resolver';
import puller from './puller';
import pusher from './pusher';
import connector from './connector';
import storeInit from './store';

export default class SyncEngine {
    public pull = puller;
    public resolve = resolver;
    public push = pusher;
    public connect = connector;
    public store: Function;

    constructor(nvCRM: nvCRMi) {
        this.store = storeInit(nvCRM);  // selected adapter
    }
}
