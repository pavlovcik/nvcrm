import Proposal from "../../../../types/Proposal";
import get from "./get";

export default async function downloader(...urls: string[]): Promise<Proposal> {
	let persisted = this.load();
    // console.log(this);
    // debugger;
    // console.log({persisted});

	return await get(...urls)
		.then(injectCache)
		.then(this.convert);

	async function injectCache(inbound: any[]): Promise<any[]> {
		let flattened = [persisted, ...inbound];
		// console.log({ flattened });
		return Promise.all(flattened);
	}
}
