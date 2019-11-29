import Project from "../../../types/Project";
import Proposal from "../../../types/Proposal";

export interface Identified {
    account?: Account[];
    project?: Project[];
    proposal?: Proposal[];
};

export default function identify(
    responses: any[]
): { identified: Identified, unexpected: any } {

    /**
     * Check the metadata for its type and understand what was just received.
     * Then add to an array so that the modified time can be considered for resolving
     */

    let identified: Identified = {};
    let unexpected = {};	//	We were able to read the object.meta.type but it wasn't "account", "project", or "proposal"

    responses.forEach(parser);

    return { identified, unexpected }

    function parser(object: any) {
        if (object.meta) {
            let type = object.meta.type;
            if (type) {
                if (type === "project" || type === "account" || type === "proposal") {
                    if (!identified[type]) identified[type] = [object];
                    else identified[type].push(object)
                } else {
                    if (!unexpected[type]) unexpected[type] = [object];
                    else unexpected[type].push(object)
                }
            }
        } else {    //  No meta supplied with object... @TODO: gotta figure this one out?
            throw new TypeError(`Receiving object does not contain "meta" property.`)
        }
    }

}