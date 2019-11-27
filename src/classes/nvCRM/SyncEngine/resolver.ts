import Proposal from "../../../types/Proposal";

export default function resolver(a: Proposal, b: Proposal): Proposal {

    /**
     * This simply needs to compare timestamps between competing copies of the data.

     * It should ideally check three properties in each argument:
     *  1. proposal.meta.updated    //  maybe?
     *  2. proposal.account.meta.updated
     *  3. proposal.project.meta.updated
     *
     * Then it should recompile the latest information and sync to the server/Drive.
     * This same function should be used by server/Drive to reconcile the latest data.
     */

    return new Date(a.meta.updated) > new Date(b.meta.updated) ? a : b // @TODO: only does 1. now.


};