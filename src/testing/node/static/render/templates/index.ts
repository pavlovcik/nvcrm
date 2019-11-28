import Proposal from '../../../../../types/Proposal';
import generate from './generate';

export default function templates(query: string, proposal: Proposal) {
    let self = { templates: generate(query, proposal), proposal: undefined };
    self.proposal = template(self.templates, query);
    return self;
}

function template(templates: any, query: string) {
    let els = document.querySelectorAll(query);
    let x = els.length;
    let output = {};
    const cachedRegex = new RegExp(/[\[|\]]/igm);
    while (x--) {
        let templateId = els[x].getAttribute(query.replace(cachedRegex, ``));
        output[templateId] = clobber(els[x], templates[templateId]);
    }
    return output
}

function clobber(target: Element, template: DocumentFragment) {
    const serializer = new XMLSerializer();
    target.outerHTML = serializer.serializeToString(template);
}