import Proposal from "../../types/Proposal";
import app, { nvCRMi } from "./setup";

const responders = {
	browser: async (...urls: string[]): Promise<Proposal> => await app.store.download(...urls),
	node: async (mystery: any[]): Promise<Proposal> => await app.store.convert(mystery),
	drive: _ => alert(`Google Drive environment responder not implemented.`),
	unknown: _ => alert(`Unknown execution environment.`)
};

export default async function nvCRM(...mystery: any): Promise<nvCRMi> {
	let x = mystery.length;
	let downloaded: Proposal | void;

	if (x === 1) {
		downloaded = await responders[app.environment](mystery);
	} else {
		downloaded = await responders[app.environment].apply(app, [...mystery]);
	}

	if (typeof downloaded == void 0) {
		throw new TypeError(`downloaded should be in Proposal format`);
	}

	app.store.write(downloaded);

	return app;
}
