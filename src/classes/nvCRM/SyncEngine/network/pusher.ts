import Proposal from "../../../../types/Proposal";
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

    return await post(url, proposal);
}