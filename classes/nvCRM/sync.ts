import Proposal from '../../types/Proposal';
interface nvCRMi { environment: string; version?: string; proposal?: Proposal; sync?: SyncEngine; }

import resolver from './resolver';
import puller from './puller';
import pusher from './pusher';

export default class SyncEngine {
    public pull = puller;
    public resolve = resolver;
    public store: Function = undefined;
    public push = pusher;

    constructor(nvCRM: nvCRMi) {

        /**
         *
         * This selects and returns the correct storage adapter in order to properly handle the different storage function
         * requirements based on the execution environment, which can be either one of the following:
         * the browser, nodejs, and possibly Google Drive.
         *
         */

        let adapter = {
            browser(): Function {
                /*... understands how to work with localStorage */
                return function storage(proposal: Proposal): Proposal {
                    localStorage[window.location.pathname] = JSON.stringify(proposal);
                    return nvCRM.proposal = JSON.parse(localStorage[window.location.pathname]);
                }
            },
            node(): Function {
                /*... understands how to work with JSON file storage and fs.write */
                return function storage(index: string): Proposal {
                    return null
                }
            },
            drive(): Function {
                /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
                return function storage(index: string): Proposal {
                    return null
                }
            }
        };

        this.store = adapter[nvCRM.environment](nvCRM)  // selected adapter
    }
}
