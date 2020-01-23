import Proposal from "../../../../types/Proposal";
import resolver from "../converter/resolver";

/** ====================== **/

export const browser = {
	/*... understands how to work with localStorage */
	_state: (function() {
		try {
			return JSON.parse(localStorage[window.location.pathname]);
		} catch (e) {
			return null;
		}
	})(),
	get: function browserStoreGet(): Proposal {
		return this._state;
	},
	set: function browserStoreSet(proposal: Proposal): void {
		// @ts-ignore
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
	// @TODO: check if getter is necessary. syntactic sugar says it should be.

	// get: async function nodeStoreGet(accountName, projectName): Promise<Proposal> {
	// 	const fs = require("fs-extra");
	// 	// const accountName = proposal.account.meta.name.toLowerCase().replace(/\//gim, `-`);
	// 	// const projectName = proposal.project.meta.name.toLowerCase().replace(/\//gim, `-`);

	// 	// fs.ensureDir(`${__dirname}/client/${accountName}/${projectName}/`, () => {
	// 	let account = fs.readFileSync(`${__dirname}/client/${accountName}/account.json`, `UTF-8`);
	// 	let project = fs.readFileSync(`${__dirname}/client/${accountName}/${projectName}/project.json`, `UTF-8`);
	// 	// });

	// 	return {
	// 		meta: null, //  @TODO: figure this one out
	// 		account,
	// 		project
	// 	};
	// },
	set: function nodeStoreSet(proposal: Proposal): Proposal {
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

		return proposal;
	}
};

/** ====================== **/

export const drive = {
	/*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
	get: () => {
		console.log(`*** getting from drive ***`);

		return {};
	},
	set: () => {
		return function driveStore(proposal: Proposal): Proposal {
			this.proposal = proposal;
			return proposal;
		};
	}
};

/** ====================== **/
