import nvCRM from ".";
import Proposal from '../../types/Proposal';

/**
 *
 * This simply selects and returns the correct storage adapter
 * upon initialization of nvCRM in order to properly handle the different storage conditions
 * based on the execution environment, which can be either one of the following:
 * the browser, nodejs, and possibly Google Drive.
 *
 */

export default class SyncEngine {

    public store: Function;
    public resolve = function resolver(local: Proposal, remote: Proposal) {

        /**
         * This simply needs to compare timestamps between the local and remote copies of the data.

         * It should ideally check three properties in each argument:
         *  1. proposal.meta.updated    //  maybe?
         *  2. proposal.account.meta.updated
         *  3. proposal.project.meta.updated
         *
         * Then it should recompile the latest information and sync to the server/Drive.
         * This same function should be used by server/Drive to reconcile the latest data.
         */

    };
    // public push: Promise<void> = async function pusher(): Promise<void> { };

    public push = async function pusher(): Promise<any> {   //  @TODO: design API response.

        /**
         * If this is browser, push to node.
         * If this is node, push to drive.
         * If this is drive, push to node. @TODO: ?
         *
         */

    }

    constructor(nvCRM: nvCRM) {  //  adapter selection upon construction
        this.store = this.adapter[nvCRM.environment](nvCRM)  // selected adapter
    }


    private adapter = {

        browser(nvCRM: nvCRM) {
            /*... understands how to work with localStorage */
            // I question the design of this setter...prompts user to set WHERE in localStorage they want to save... @FIXME:
            return function storage(location: string) {
                return localStorage[location] = JSON.stringify(nvCRM.proposal)
            }
        },
        node(nvCRM: nvCRM) {
            /*... understands how to work with JSON file storage and fs.write */
            return function storage(location: string) {
                return null
            }
        },
        drive(nvCRM: nvCRM) {
            /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
            return function storage(location: string) {
                return null
            }
        }

    }

}
