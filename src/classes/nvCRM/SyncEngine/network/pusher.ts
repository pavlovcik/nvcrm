import Project from "../../../../types/Project";
import Proposal from "../../../../types/Proposal";
import Account from "../../../../types/Account";
import post from "./post";

export default async function pusher(url: string): Promise<any> {

    //  @TODO: design API response.

    /**
     * If this is browser, push to node.
     * If this is node, push to drive.
     * If this is drive, push to node. @TODO: figure out if this is necessary
     *
     */

    let proposal: Proposal = this.store;
    // let account: Account = proposal.account;
    // let project: Project = proposal.project;

    // console.log({
    //     account,
    //     project,
    //     proposal
    // });

    return await post(url, proposal);
}