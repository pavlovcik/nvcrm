import Proposal from '../../../../types/Proposal';
import resolver from "../converter/resolver";
import compile from '../converter/compile';

/** ====================== **/

export const browser = {
	/*... understands how to work with localStorage */
	_state: (function () {
		try {
			return JSON.parse(localStorage[window.location.pathname]);
		} catch (e) {
			return null;
		}
	})(),
	load(): Proposal {
		return this._state;
	},
	write(proposal: Proposal) {
		if ("proposal" !== proposal?.meta?.type) throw new TypeError(`Refuse to write non-proposal object to proposal store.`);

		let test = [this._state, proposal].sort(resolver); //  @TODO: fix resolver syntax
		let latest = test.pop();
		this._state = latest;
		localStorage[window.location.pathname] = JSON.stringify(proposal);
	}
};

/** ====================== **/

export const node = {
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
		// this._state = proposal; //  @FIXME: temporary for dev convenience

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

/** ====================== **/

export const drive = {
	/*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
	load: () => {
		console.log(`*** loading from drive ***`);

		return {};
	},
	write: () => {
		return function driveStore(proposal: Proposal): Proposal {
			this.proposal = proposal;
			return proposal;
		};
	}
};

/** ====================== **/
