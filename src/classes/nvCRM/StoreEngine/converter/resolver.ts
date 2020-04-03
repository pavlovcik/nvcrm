import Proposal from "../../../../types/Proposal";

export default function resolver(proposalA: Proposal | null, proposalB: Proposal | null): number {

    /**
     * This simply needs to compare timestamps between competing copies of the data.

     * It should ideally check three properties in each argument:
     *  1. proposal.meta.updated    //  maybe?
     *  2. proposal.account.meta.updated
     *  3. proposal.project.meta.updated
     *
     * Then it should recompile the latest information and store to the server/Drive.
     * This same function should be used by server/Drive to reconcile the latest data.
     */


    const A_META = new Date(proposalA?.meta?.updated || 0);
    const A_ACCOUNT = new Date(proposalA?.account?.meta?.updated || 0);
    const A_PROJECT = new Date(proposalA?.project?.meta?.updated || 0);

    const B_META = new Date(proposalB?.meta?.updated || 0);
    const B_ACCOUNT = new Date(proposalB?.account?.meta?.updated || 0);
    const B_PROJECT = new Date(proposalB?.project?.meta?.updated || 0);

    let score = [0, 0];

    A_META > B_META ? ++score[0] : ++score[1]
    A_ACCOUNT > B_ACCOUNT ? ++score[0] : ++score[1]
    A_PROJECT > B_PROJECT ? ++score[0] : ++score[1]

    if (score[0] > score[1]) return -1
    else if (score[0] < score[1]) return 1   //  @FIXME: else if opposite and then else?
    return 0
};