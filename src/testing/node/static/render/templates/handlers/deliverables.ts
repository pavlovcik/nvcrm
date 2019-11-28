import Proposal from "../../../../../../types/Proposal";
import { Deliverable } from '../../../../../../types/Project';

export default function deliverables(el: Element, proposal: Proposal): DocumentFragment {
    let serviceCount = proposal.project.services.length;
    let dfgs = document.createDocumentFragment();
    let serviceIndex = -1;
    while (++serviceIndex < serviceCount) {
        let deliverables = proposal.project.services[serviceIndex].deliverables;
        let dfg = generateNodes(deliverables, serviceIndex++, el);
        dfgs.appendChild(dfg);
    }
    return dfgs
}

function generateNodes(deliverables: Deliverable[], serviceIndex: number, template: Element): DocumentFragment {
    let dfg = document.createDocumentFragment();
    let index = -1;
    let deliverablesRemaining = deliverables.length;
    while (++index < deliverablesRemaining) {
        let cloned = <HTMLElement>template.cloneNode(true);
        cloned.innerHTML = template.innerHTML.replace(/\.services\[\]/igm, `.services[${serviceIndex}]`).trim();
        cloned.innerHTML = cloned.innerHTML.replace(/\.deliverables\[\]/igm, `.deliverables[${index}]`).trim();
        dfg.appendChild(cloned)
    }
    return dfg
}