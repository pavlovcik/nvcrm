import SyncEngine from "./SyncEngine";
import Proposal from "../../types/Proposal";

let ENVIRONMENT: "node" | "browser" | "drive" | "unknown" = "unknown";
let PACKAGE: any;
let VERSION: string;

try {
    PACKAGE = require("../../../package.json");  //  @FIXME: dependent on tsconfig.json output structure.
    VERSION = PACKAGE.version ? PACKAGE.version : null;
} catch (e) {
    console.error(e);
    VERSION = null;
}

if (globalThis) {
    if (globalThis.window) ENVIRONMENT = "browser";
    else if (globalThis.global) ENVIRONMENT = "node";
}

let self: nvCRMi = {
    proposal: undefined,
    environment: ENVIRONMENT,
    version: VERSION,
    sync: new SyncEngine({
        environment: ENVIRONMENT,
        version: VERSION
    })
};

export default self;

export interface nvCRMi {
    environment: ("browser" | "node" | "drive" | "unknown");
    version?: string;
    proposal?: Proposal | Promise<Proposal>;    //  @FIXME: not sure if promise should be here
    sync?: SyncEngine;
}