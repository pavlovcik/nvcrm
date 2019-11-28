import Proposal from "../../../types/Proposal";
import { nvCRMi } from "../setup";

export default function storeInit(nvCRM: nvCRMi): Function {
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
            };
        },
        node(): Function {
            /*... understands how to work with JSON file storage and fs.write */
            return function storage(proposal: Proposal): Proposal {

                const fs = require("fs-extra");
                const accountName = proposal.account.meta.name.toLowerCase().replace(/\//igm, `-`);
                const projectName = proposal.project.meta.name.toLowerCase().replace(/\//igm, `-`);

                // fs.ensureDirSync(`${__dirname}/client/${accountName}`);
                fs.ensureDirSync(`${__dirname}/client/${accountName}/${projectName}/`);
                fs.writeFileSync(`${__dirname}/client/${accountName}/account.json`, JSON.stringify(proposal.account), `UTF-8`);
                fs.writeFileSync(`${__dirname}/client/${accountName}/${projectName}/project.json`, JSON.stringify(proposal.project), `UTF-8`);

                return nvCRM.proposal = proposal;
            };
        },
        drive(): Function {
            /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
            return function storage(index: string): Proposal {
                return null;
            };
        }
    };
    return adapter[nvCRM.environment](nvCRM);
}