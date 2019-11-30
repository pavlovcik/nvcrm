import { Environment } from '../setup';
import converter from './converter/';
import puller from './network/puller';
import pusher from './network/pusher';
import resolver from './converter/resolver';
import store from './store/';


export default class SyncEngine {
    public pull = puller;
    public push = pusher;
    public resolve = resolver;
    public convert = converter;
    private adapter: Function;

    public get store() {
        return this.adapter.get()
    }
    public set store(proposal) {
        this.adapter.set(proposal)
    }

    constructor(environment: Environment) {
        this.adapter = store(environment);  // Select storage adapter at runtime
    }
}
