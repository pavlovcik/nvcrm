// nvCRM.syncEngine();

// import Proposal from "../../types/Proposal"

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
VERSION = VERSION.version ? VERSION.version : false;

import get from "./get";

import Account from "../../types/Account";
import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

export default class nvCRM {

	public Ready: Promise<void>;	//	@FIXME:

	public proposal: Proposal;
	private environment: "browser" | "node" = window ? "browser" : "node"; //	test
	private version: string | boolean = VERSION;

	constructor(accountId: string, projectId: string) {
		this.Ready = this.initialize(accountId, projectId); //	async
	}

	private async initialize(accountURL: string, scopeURL: string) {
		let account = await get(accountURL);
		// console.log({ account: account });
		let project = await get(scopeURL);
		// console.log({ scope: project });
		this.proposal = await this.generateProposal(account, project);
	}

	private async generateProposal(account: Account, project: Project): Promise<Proposal> {
		return {
			meta: {
				type: "proposal",
				updated: new Date().toISOString(),
				source: getSource(this),
				name: getName(account, project) //	@TODO: ?
			},
			account,
			project
		};

		function getSource(app: nvCRM): string {
			if (app.version) {
				return `${app.environment}-${app.version}`;
			} else {
				`${app.environment}`;
			}
		}
		function getName(account: Account, project: Project): string {
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
