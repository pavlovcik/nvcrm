import Proposal from "../../../../types/Proposal";
import get from "./get";

export default async function downloader(...urls: string[]): Promise<Proposal> {
	let persisted = this.load();

	return await get(...urls)
		.then(injectCache)
		.then(this.convert);

	async function injectCache(inbound: any[]): Promise<any[]> {
		let flattened = [persisted, ...inbound];
		return Promise.all(flattened);
	}
}
