import Proposal from "../../types/Proposal";
import crm, { nvCRMi } from "./setup";

const responders = {
	browser: async (...urls: string[]): Promise<Proposal> => await crm.store.download(...urls),
	node: async (mystery: any[]): Promise<Proposal> => await crm.store.convert(mystery),
	drive: _ => {
		throw new Error(`Google Drive environment responder not implemented.`);
	},
	unknown: _ => {
		throw new Error(`Unknown execution environment.`);
	}
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let x = mystery.length;
	let downloaded: Proposal;

	if (x === 1) downloaded = await responders[crm.environment](mystery);
	else downloaded = await responders[crm.environment].apply(crm, [...mystery]);

	crm.store.write(downloaded);

	return crm;
}
