import { Environment } from "../../setup";
import * as adapters from "./adapters";

import converter from "../converter";
import resolver from "../converter/resolver";
import downloader from "../network/downloader";
import uploader from "../network/uploader";
import { Store } from "..";

/**
 *
 * This selects and returns the correct storage adapter in order to properly handle the different storage function
 * requirements based on the execution environment, which can be either one of the following:
 * the browser, nodejs, and possibly Google Drive.
 *
 */

export default function store(environment: Environment): Store {
	let adapter = adapters[environment];
	adapter.download = downloader;
	adapter.upload = uploader;
	adapter.resolve = resolver;
	adapter.convert = converter;
	return adapter;
}
