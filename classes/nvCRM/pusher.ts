import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

export default async function pusher(url: string): Promise<any> {   //  @TODO: design API response.

    /**
     * If this is browser, push to node.
     * If this is node, push to drive.
     * If this is drive, push to node. @TODO: ?
     *
     */

    let account: Account = this.nvCRM.proposal.account;
    let project: Project = this.nvCRM.proposal.project;
    let proposal: Proposal = this.nvCRM.proposal;

    console.log({
        account,
        project,
        proposal
    });

    return url
}