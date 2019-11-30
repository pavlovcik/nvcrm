import Proposal from "../../../../types/Proposal";

export default function resolver(a: Proposal, b: Proposal): number {

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


    const A_META = new Date(a.meta.updated);
    const A_ACCOUNT = new Date(a.account.meta.updated);
    const A_PROJECT = new Date(a.project.meta.updated);

    const B_META = new Date(b.meta.updated);
    const B_ACCOUNT = new Date(b.account.meta.updated);
    const B_PROJECT = new Date(b.project.meta.updated);

    let score = [0, 0];

    A_META > B_META ? ++score[0] : ++score[1]
    A_ACCOUNT > B_ACCOUNT ? ++score[0] : ++score[1]
    A_PROJECT > B_PROJECT ? ++score[0] : ++score[1]

    if (score[0] > score[1]) return -1
    else return 1
    return 0

    // return new Date(a.meta.updated) > new Date(b.meta.updated) ? a : b // @TODO: only does 1. now.


};