import Proposal from '../../../../types/Proposal';
import Account from '../../../../types/Account';
import resolver from "../converter/resolver";
import Meta from '../../../../types/Meta';
import Project from '../../../../types/Project';
import compile from '../converter/compile';

const check = {
	meta: (m: Meta): boolean => {
		if (!m?.type) return false
		if (!m?.updated) return false
		if (!m?.source) return false
		if (!m?.name) return false
		return true
	},
	account: (a: Account): boolean => {
		if (!a?.meta) return false
		if (!a?.client) return false
		if (!a?.agent) return false
		return true
	},
	project: (p: Project): boolean => {
		if (!p?.meta) return false
		if (!p?.start) return false
		if (!p?.deposit) return false
		if (!p?.reason) return false
		if (!p?.services) return false
		return true
	}
}


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
		// This should confirm integrity of saved proposal. If corrupted, scrap it.
		let o = this._state as Proposal;
		let integrity = {
			meta: check.meta(o.meta),
			account: check.account(o.account),
			project: check.project(o.project)
		};

		if (integrity.account && integrity.project) {
			if (!integrity.meta) o = compile(o);	//	Can regenerate meta
			return o
		}

		return null
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
