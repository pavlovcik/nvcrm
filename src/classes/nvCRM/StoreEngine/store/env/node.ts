import Proposal from "../../../../../types/Proposal";
import compile from "../../converter/compile";

export default {
    /*... understands how to work with JSON file storage and fs.write */
    _state: null,
    load(proposal: Proposal): Proposal {
        // const fs = require("fs-extra");
        // const accountName = proposal.account.meta.name.toLowerCase().replace(/\//gim, `-`);
        // const projectName = proposal.project.meta.name.toLowerCase().replace(/\//gim, `-`);
        // const directory = `${__dirname}/client`;

        // return await fs.ensureDir(`${directory}/${accountName}/${projectName}/`, async (): Promise<Proposal> => {

        // let account = await fs.readFile(`${directory}/${accountName}/account.json`, `UTF-8`);
        // let project = await fs.readFile(`${directory}/${accountName}/${projectName}/project.json`, `UTF-8`);
        // let meta = {	//  @TODO: figure this one out
        // 	type: "proposal",
        // 	updated: await fs.stat(`${directory}/${accountName}/${projectName}/project.json`).mtime,
        // 	source: `${directory}/${accountName}/${projectName}/project.json`,
        // 	name: null
        // };
        return compile(proposal)
        // });
    },
    write(proposal: Proposal): Proposal {
        // @ts-ignore
        if ("proposal" !== proposal?.meta?.type) throw new TypeError(`Refuse to write non-proposal object to proposal store.`);

        const fs = require("fs-extra");
        const accountName = proposal.account.meta.name.toLowerCase().replace(/\//gim, `-`);
        const projectName = proposal.project.meta.name.toLowerCase().replace(/\//gim, `-`);

        fs.ensureDir(`${__dirname}/client/${accountName}/${projectName}/`, () => {
            fs.writeFile(`${__dirname}/client/${accountName}/account.json`, JSON.stringify(proposal.account), `UTF-8`);
            fs.writeFile(`${__dirname}/client/${accountName}/${projectName}/project.json`, JSON.stringify(proposal.project), `UTF-8`);
        });

        this._state = proposal;

        return proposal;
    }
};