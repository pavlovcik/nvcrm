import Proposal from "../../../../types/Proposal";
import resolver from "../converter/resolver";

/** ====================== **/

export const browser = {
    /*... understands how to work with localStorage */
    _proposal: (function () {
        try {
            return JSON.parse(localStorage[window.location.pathname]);
        } catch (e) {
            return null
        }
    })(),
    get: function browserStoreGet(): Proposal {
        return this._proposal;
    },
    set: function browserStoreSet(proposal: Proposal): void {
        // @ts-ignore
        if ("proposal" !== proposal ?.meta ?.type) throw new TypeError(`Refuse to write non-proposal object to proposal store.`);

        let test = [this._proposal, proposal].sort(resolver);
        let latest = test.pop();

        this._proposal = latest;
        localStorage[window.location.pathname] = JSON.stringify(proposal);
    }
};

/** ====================== **/

export const node = {
    /*... understands how to work with JSON file storage and fs.write */
    _proposal: null,
    get: function nodeStoreGet(): Proposal {
        return this._proposal
    },
    set: function nodeStoreSet(proposal: Proposal): Proposal {
        // @ts-ignore
        if ("proposal" !== proposal ?.meta ?.type) throw new TypeError(`Refuse to write non-proposal object to proposal store.`);
        this._proposal = proposal;

        const fs = require("fs-extra");
        const accountName = proposal.account.meta.name.toLowerCase().replace(/\//igm, `-`);
        const projectName = proposal.project.meta.name.toLowerCase().replace(/\//igm, `-`);

        fs.ensureDirSync(`${__dirname}/client/${accountName}/${projectName}/`);
        fs.writeFileSync(`${__dirname}/client/${accountName}/account.json`, JSON.stringify(proposal.account), `UTF-8`);
        fs.writeFileSync(`${__dirname}/client/${accountName}/${projectName}/project.json`, JSON.stringify(proposal.project), `UTF-8`);

        return proposal;
    }
};

/** ====================== **/

export const drive = {
    /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
    get: () => {
        console.log(`*** getting from drive ***`);
        debugger;
        return {}
    },
    set: () => {
        return function driveStore(proposal: Proposal): Proposal {
            this.proposal = proposal
            return proposal;
        }
    }
};

/** ====================== **/
