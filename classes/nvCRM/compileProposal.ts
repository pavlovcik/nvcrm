import nvCRM from ".";

import Meta from "../../types/Meta";
import Project from "../../types/Project";
import Account from "../../types/Account";
import Proposal from "../../types/Proposal";

export default function compileProposal(account: Account, project: Project): Proposal {

    /**
     * 😭😭😭 redundant!!!!
     */
    let ENVIRONMENT: "browser" | "node" = window ? "browser" : "node"; //	execution context, @TODO: not sure if "drive" is a required environment?
    let VERSION = require("../../package.json");
    VERSION = VERSION.version ? VERSION.version : null;

    return {
        meta: {
            type: "proposal",
            updated: new Date().toISOString(),
            source: generateSource(VERSION, ENVIRONMENT),
            name: generateName(account, project) //	@TODO: ?
        },
        account,
        project
    };

    function generateSource(v: string, e: string): string {
        if (v) {
            return `${e}-${v}`;
        } else {
            `${e}`;
        }
    }

    function generateName(account: Account, project: Project): string {
        let buffer = null;

        if (account.meta.name) {
            buffer = account.meta.name;
        }
        if (project.meta.name) {
            buffer += `/`;
            buffer += project.meta.name;
        }

        return buffer;
    }
}