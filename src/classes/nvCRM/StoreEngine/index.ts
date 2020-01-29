import { Environment } from "../setup";
import store from "./store";
export interface Store {
	download: Function;
	upload: Function;
	resolve: Function;
	convert: Function;
	write: Function;
	load: Function;
}

export default function StoreEngine(environment: Environment): Store {
	return <Store>store(environment); // Select storage adapter at runtime
}
