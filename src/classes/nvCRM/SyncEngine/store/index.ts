import { Environment } from "../../setup";
import * as adapters from "./adapters";

import converter from "../converter/";
import resolver from "../converter/resolver";
import puller from "../network/puller";
import pusher from "../network/pusher";

/**
 *
 * This selects and returns the correct storage adapter in order to properly handle the different storage function
 * requirements based on the execution environment, which can be either one of the following:
 * the browser, nodejs, and possibly Google Drive.
 *
 */

export default function store(environment: Environment): Function {
	let adapter = adapters[environment];
	adapter.pull = puller;
	adapter.push = pusher;
	adapter.resolve = resolver;
	adapter.convert = converter;
	return adapter;
}
