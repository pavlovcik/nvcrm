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
                // let title = proposal.meta.name;
                let account: string = proposal.account.meta.name;
                let project: string = proposal.project.meta.name;

                // fs.opendir(`${process.cwd()}client/`, (err, dir) => {
                //     if (err) throw err
                //     console.log({ dir });
                // });

                // fs.writeFileSync(`${process.cwd()}/${title.toLowerCase().replace(/\//igm, `-`)}.json`, JSON.stringify(proposal));
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