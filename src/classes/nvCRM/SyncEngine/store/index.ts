import { Environment } from "../../setup";
import * as adapters from "./adapters"

/**
  *
  * This selects and returns the correct storage adapter in order to properly handle the different storage function
  * requirements based on the execution environment, which can be either one of the following:
  * the browser, nodejs, and possibly Google Drive.
  *
  */

export default function store(environment: Environment): Function {
  return adapters[environment]
}
