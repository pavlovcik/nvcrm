import { Environment } from "../setup";
import store from "./store";
export default function StoreEngine(environment: Environment) {
	return store(environment); // Select storage adapter at runtime
}
