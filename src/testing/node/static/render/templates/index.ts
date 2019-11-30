import Proposal from '../../../../../types/Proposal';
import generateTemplates from './generate';

export default function templatesGenerator(query: string, proposal: Proposal) {
    let generatedTemplates = generateTemplates(query, proposal);
    processTemplates(generatedTemplates, query);
    return generatedTemplates;
}

function processTemplates(templates: any, query: string) {
    let els = document.querySelectorAll(query);
    let x = els.length;
    let output = {};
    const cachedRegex = new RegExp(/[\[|\]]/igm);
    while (x--) {
        let templateId = els[x].getAttribute(query.replace(cachedRegex, ``));
        output[templateId] = writeToDOM(els[x], templates[templateId]);
    }
    return output
}

function writeToDOM(target: Element, template: DocumentFragment) {
    const serializer = new XMLSerializer();
    target.outerHTML = serializer.serializeToString(template);
    return template
}