import SyncEngine from "./SyncEngine";

export type Environment = "node" | "browser" | "drive" | "unknown";
export interface nvCRMi {
    environment: Environment;
    version: string;
    sync: SyncEngine;
}

const ENVIRONMENT = determineEnvironment();
const VERSION = determineVersion();

export default {
    environment: ENVIRONMENT,
    version: VERSION,
    sync: new SyncEngine(ENVIRONMENT)
}

function determineEnvironment(): Environment {
    let ENVIRONMENT: Environment = "unknown";

    if (globalThis) {
        if (globalThis.window) ENVIRONMENT = "browser";
        else if (globalThis.global) ENVIRONMENT = "node";
    }
    return ENVIRONMENT
}

function determineVersion(): string {
    let VERSION: string;
    try {
        let PACKAGE: any;
        PACKAGE = require("../../../package.json");
        VERSION = PACKAGE.version ? PACKAGE.version : null;
    } catch (e) {
        console.error(e);
        VERSION = null;
    }
    return VERSION
}