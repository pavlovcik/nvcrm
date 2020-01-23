import Proposal from "../../types/Proposal";
import crm, { nvCRMi } from "./setup";
// import resolver from "./SyncEngine/converter/resolver";

const responders = {
	browser: async (...urls: string[]): Promise<Proposal> => {
		let proposal = await crm.sync.pull(...urls);
		// console.log({proposal})
		return proposal
	},
	node: async (mystery: any[]): Promise<Proposal> => await crm.sync.convert(mystery),
	drive: (o): never => {
		throw new Error(`Google Drive environment responder not implemented.`);
	},
	unknown: (o): never => {
		throw new Error(`Unknown execution environment.`);
	}
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let x = mystery.length;
	let downloaded: Proposal;
	if (x === 1) downloaded = await responders[crm.environment](mystery);
	else downloaded = await responders[crm.environment].apply(crm, [...mystery]);



	crm.sync.store = downloaded;

	return crm;
}
