import nvCRM from ".";

/**
 *
 * This simply selects and returns the correct storage adapter
 * upon initialization of nvCRM in order to properly handle the different storage conditions
 * based on the execution environment, which can be either one of the following:
 * the browser, nodejs, and possibly Google Drive.
 *
 */

export default class SyncEngine {

    public store = function storage() { }
    public resolve = function resolver() { };
    // public push: Promise<void> = async function pusher(): Promise<void> { };
    public push = function pusher() { }


    constructor(nvcrm: nvCRM) {  //  adapter selection upon construction

        let adapter = {
            browser() {
                console.log(this);
                return function browserAdapter() {
                    /*... understands how to work with localStorage */
                }
            },
            node() {
                console.log(this);
                return function nodeAdapter() {
                    /*... understands how to work with JSON file storage and fs.write */
                }
            },
            drive() {
                console.log(this);
                return function driveAdapter() {
                    /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
                }
            },
        };

        this.store = adapter[nvcrm.environment]  // selected adapter
    }



}
