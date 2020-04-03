import handlers from "./handlers";
import Proposal from "../../../../../../types/Proposal";

export default function generateTemplates(query: string, proposal: Proposal): typeof handlers {
    let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
    let output = {};
    shadowRoots.forEach(article => {
        let els = article.shadowRoot.querySelectorAll(query);
        let x = els.length;
        const cachedRegex = new RegExp(/[\[|\]]/igm);
        while (x--) {
            let templateId: string = els[x].getAttribute(query.replace(cachedRegex, ``));
            if (handlers[templateId]) output[templateId] = handlers[templateId](els[x], proposal);
        }
    });
    return output as typeof handlers
}