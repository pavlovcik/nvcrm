import { MetaDataTypesAsStrings, MetaDataTypesAsInterfaces } from "../../../../types/Meta";

export type Identified = { [key in MetaDataTypesAsStrings]: MetaDataTypesAsInterfaces[]; };

export default function identify(projectFiles: MetaDataTypesAsStrings[]): { identified: Identified, unexpected: { [key: string]: any } } {

    /**
     * Check the metadata for its type and understand what was just received.
     * Then add to an array so that the modified time can be considered for resolving
     */

    let identified = { "client": [], "proposal": [], "account": [], "project": [], "service": [] };
    let unexpected = {};	//	We were able to read the object.meta.type but it wasn't "account", "project", or "proposal"

    projectFiles.forEach(interpret);

    return { identified, unexpected }

    function interpret(object: any) {
        let type = object?.meta?.type;
        if (type as string) {
            switch (type) {
                case "client":
                case "proposal":
                case "account":
                case "project":
                case "service":
                    return identified[type].push(object)
            }
        }
        unexpected[type] = unexpected[type] || [];
        return unexpected[type].push(object);
    }
    // } else {    //  No meta supplied with object... @TODO: gotta figure this one out?
    // console.error(`Receiving object does not contain "meta" property.`)
    // throw new TypeError(`Receiving object does not contain "meta" property.`)
    // }
    // }
}
