// nvCRM.syncEngine();

// import Proposal from '../../types/Proposal';

// class nvCRM {
// 	public syncEngine(a: Proposal, b: Proposal, db: Storage, handler: Function) {
// 		/**
// 		 * This should work in both the client and server enviroment.
// 		 * This code should be shared as well.
// 		 * First we need to know what we are working with, so we look in the header for its datatype.
// 		 */

// 		handler(a);
// 	}
// }

let VERSION = require("../../package.json");
VERSION = VERSION.version ? VERSION.version : null;

import get from "./get";

import Account from "../../types/Account";
import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

export default class nvCRM {
	public initialized: Promise<Proposal>; //	@FIXME: this is a really crappy workaround where it leaves a promise here in order to use await nvCRM to async get the account/project jsons upon construction.

	public proposal: Proposal;
	private environment: "browser" | "node" = window ? "browser" : "node"; //	execution context, @TODO: not sure if "drive" is a required environment?
	private version: string | null = VERSION;

	constructor(accountId: string, projectId: string) {
		this.initialized = this.initialize(accountId, projectId); //	async
	}

	private async initialize(accountURL: string, scopeURL: string) {
		let account = await get(accountURL);
		let project = await get(scopeURL);

		this.proposal = this.generateProposal(account, project);

		return this.proposal;
	}

	private generateProposal(account: Account, project: Project): Proposal {

		return {
			meta: {
				type: "proposal",
				updated: new Date().toISOString(),
				source: generateSource(this),
				name: generateName(account, project) //	@TODO: ?
			},
			account,
			project
		};

		function generateSource(app: nvCRM): string {
			if (app.version) {
				return `${app.environment}-${app.version}`;
			} else {
				`${app.environment}`;
			}
		}

		function generateName(account: Account, project: Project): string {
			let buffer = null;

			if (account.meta.name) {
				buffer = account.meta.name;
			}
			if (project.meta.name) {
				buffer += `/`;
				buffer += project.meta.name;
			}

			return buffer;
		}
	}
}
