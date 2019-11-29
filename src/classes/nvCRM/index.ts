import Proposal from "../../types/Proposal"
import crm, { nvCRMi } from "./setup"

import identify from "./SyncEngine/identify";
import organize from "./SyncEngine/organize";
import compile from "./SyncEngine/compile";

const responders = {
	"drive": (o): never => {
		throw new Error(`Google Drive environment responder not implemented.`)
	},
	"unknown": (o): never => {
		throw new Error(`Unknown execution environment.`)
	},
	"browser": async (...urls: string[]): Promise<nvCRMi> => {
		let proposal = await crm.sync.pull(...urls);
		crm.sync.store = proposal
		// console.log(crm.sync.store);
		return crm
	},
	"node": async (o: any): Promise<nvCRMi> => {
		// directly passed in ?
		if (o.length === 1 && typeof o[0] == "object") {
			let prop: Proposal = o.shift();
			crm.proposal = await crm.sync.connect(prop);
			return crm
		} else throw new Error(`Unexpected object type passed in.`);
	}
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let x = mystery.length;
	if (x === 1) {
		return await responders[crm.environment](mystery)
	} else {
		let flattened = [...mystery];
		return await responders[crm.environment].apply(crm, flattened);
	}
}