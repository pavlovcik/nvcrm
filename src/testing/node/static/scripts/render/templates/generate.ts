import { default as handlers } from "./handlers";
import Proposal from '../../../../../types/Proposal';

export default function generateTemplates(query: string, proposal: Proposal): any {
    let els = document.querySelectorAll(query);
    let x = els.length;
    const cachedRegex = new RegExp(/[\[|\]]/igm);
    let output = {};
    while (x--) {
        let templateId = els[x].getAttribute(query.replace(cachedRegex, ``));
        if (handlers[templateId]) output[templateId] = handlers[templateId](els[x], proposal);
    }
    return output
}