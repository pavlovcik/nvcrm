import SyncEngine from "./sync";

let VERSION = require("../../package.json");
VERSION = VERSION.version ? VERSION.version : null;

let self = {
	environment: window ? "browser" : "node",
	version: VERSION,
	proposal: undefined,
	sync: undefined
};

self.sync = new SyncEngine(self);

export default async function nvCRM(...urls: string[]) {
	self.proposal = await self.sync.pull(...urls);
	return self
}
