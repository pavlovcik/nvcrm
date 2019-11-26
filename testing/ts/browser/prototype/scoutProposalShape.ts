import Proposal from "../../../types/Proposal";

import { Service, Deliverable } from "../../../types/Project";

export default function scoutProposalShape(proposal: Proposal) {

    let pendingTags = document.querySelectorAll(query);
    let x = pendingTags.length;
    let renderBuffer = [];
    let dfg = document.createDocumentFragment();

    while (x--) {
        let propertyName = pendingTags[x].getAttribute(attribute);

        if (propertyName.includes(`[`)) {	//	Gotta loop through the array
            renderBuffer.push(dynamicHtmlCreationForArrays(propertyName))
        }
    }
    console.log(renderBuffer);
    return renderBuffer;

    function dynamicHtmlCreationForArrays(propertyName: string) {

        interface ServiceAndTag { service: Service; tagName: string; }

        let taggedServices: ServiceAndTag[] = [];
        let tagged = false;

        if (!tagged) {
            tagged = true;	//	only tag once.
            const TAG = "project.services";

            let services = getSafe(TAG.split(`.`), proposal);
            taggedServices = tagServices(services, TAG);
        }

        return { propertyName, taggedServices }

        function tagServices(services: Service[], tagName: string): any[] {
            /**
             * This will open up the services object
             * project.services[x]
             */



            let servicesAndTags: ServiceAndTag[] = [];

            let x = services.length;
            let tagIndex = 0;
            // let taggedServices: Service[] = [];
            while (x--) {

                servicesAndTags.push({
                    service: services[x],
                    tagName: tagName.concat(`[${tagIndex++}]`)
                });
                // let deliverables: Deliverable[] = services[x].deliverables;
                // taggedServices.push(tagDeliverables(deliverables, index, x));
            }
            return servicesAndTags
        }

        function tagDeliverables(deliverables: Deliverable[], masterIndex: number, servicesIndex: number) {
            /**
             * This will open up the deliverables object
             * project.services[x].deliverables[y]
             */
            let x = deliverables.length;
            while (x--) {
                let deliverable = deliverables[x];
                console.log(masterIndex, servicesIndex, deliverable);
            }
        }

    }
}

function getSafe(p, o) { p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o) }
