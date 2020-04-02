import generateTemplates from './generate';
import handlers from './handlers';
import Proposal from '../../../../../../types/Proposal';

export default function templatesGenerator(query: string, proposal: Proposal): typeof handlers {
    let generatedTemplates = generateTemplates(query, proposal);
    renderTemplatesToDOM(generatedTemplates, query);
    return generatedTemplates;
}
// interface TemplateType { [key: string]: DocumentFragment }

function renderTemplatesToDOM(templates: (typeof handlers), query: string): void {

    let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
    let output = {};

    shadowRoots.forEach(article => {
        let els = article.shadowRoot.querySelectorAll(query)
        let x = els.length;
        const cachedRegex = new RegExp(/[\[|\]]/igm);
        while (x--) {
            let templateId = els[x].getAttribute(query.replace(cachedRegex, ``));
            output[templateId] = templates[templateId];
            writeToDOM(els[x], templates[templateId]);
        }
    });

    // return output
}

function writeToDOM(target: Element, template: DocumentFragment) {
    // const serializer = new XMLSerializer();
    let x = template.childElementCount;
    let serialized = [];
    while (x--) {
        let child = template.children[x];
        serialized.push(
            child.innerHTML
            // serializer.serializeToString(child)
        );
    }
    target.innerHTML = serialized.join('');
    return template
}