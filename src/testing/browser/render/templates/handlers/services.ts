import Proposal from '../../../../../types/Proposal';

export default function services(el: Element, proposal: Proposal): DocumentFragment {
    let serviceCount = proposal.project.services.length;
    let dfg = generateNodes(serviceCount, el);
    return dfg
}

function generateNodes(amount: number, template: Element): DocumentFragment {
    let dfg = document.createDocumentFragment();
    let index = 0;
    while (amount--) {
        let cloned = <HTMLElement>template.cloneNode(true);
        cloned.innerHTML = template.innerHTML.replace(/\[\]/igm, `[${index++}]`).trim();
        dfg.appendChild(cloned)
    }
    return dfg
}