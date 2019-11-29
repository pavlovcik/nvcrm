import { nvCRMi, Environment } from '../setup';

import resolver from './resolver';
import puller from './puller';
import pusher from './pusher';
import connector from './connector';
import store from './store';

export default class SyncEngine {
    public pull = puller;
    public push = pusher;
    static resolve = resolver;
    public connect = connector;
    protected store: any;

    constructor(environment: Environment) {
        this.store = store(environment);  // selected adapter
    }
}
