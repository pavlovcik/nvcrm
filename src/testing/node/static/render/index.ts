import Proposal from "../../../../types/Proposal";
import templates from './templates';


/**
 * First render the templates,
 * then render the proposal.
 */

export default class RenderEngine {
    public render = renderDocument;
    public proposal: Proposal = null;
    public query: string = null;

    constructor(query: string, proposal: Proposal) {

        if (!query) throw new Error(`DOM template target query required.`);
        if (!proposal) throw new Error(`Proposal required to render DOM templates.`);

        let templatesOutput = templates(query, proposal);
        console.log({ templatesOutput });
        this.proposal = proposal;
        this.query = query;
        // console.log(this);
    }

}


function renderDocument(query: string, classname: string) {
    const proposal = this.proposal;
    const attribute = query.replace(/[\[|\]]/igm, ``);
    let pendingTags = document.querySelectorAll(query);
    let x = pendingTags.length;

    while (x--) {
        let propertyName = pendingTags[x].getAttribute(attribute);
        pendingTags[x].className += classname;
        pendingTags[x].className = pendingTags[x].className.trim();
        pendingTags[x].textContent = eval(`proposal.${propertyName}`);  //  @TODO: Remove eval somehow?
    }

}