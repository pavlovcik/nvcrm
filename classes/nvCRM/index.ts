import get from "./get";

import Account from "../../types/Account";
import Project from "../../types/Project";
import Proposal from "../../types/Proposal";

let VERSION = require("../../package.json");
VERSION = VERSION.version ? VERSION.version : null;

export default class nvCRM {
	public proposal: Promise<Proposal> | Proposal; //	@FIXME: this is a really crappy workaround where it leaves a promise here in order to use await nvCRM to async get the account/project jsons upon construction. it stays as a promise until await is called...

	/**
	 *  let client = new nvCRM(accountId, projectId);
	 *  await client.proposal;
	 */

	// public proposal: Proposal;

	private environment: "browser" | "node" = window ? "browser" : "node"; //	execution context, @TODO: not sure if "drive" is a required environment?
	private version: string | null = VERSION;

	constructor(accountId: string, projectId: string) {
		this.proposal = this.initialize(accountId, projectId); //	 : Promise<Proposal>
	}

	private async initialize(accountURL: string, scopeURL: string) {
		let account: Account = await get(accountURL);
		let project: Project = await get(scopeURL);

		this.proposal = this.generateProposal(account, project); //	 : Proposal

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
