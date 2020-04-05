import Proposal from "../../../../../types/Proposal";

export default {
    /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
    load: () => {
        console.log(`*** loading from drive ***`);

        return {};
    },
    write: () => {
        return function driveStore(proposal: Proposal): Proposal {
            this.proposal = proposal;
            return proposal;
        };
    }
};