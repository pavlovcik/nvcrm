import Project from "../../types/Project";
import Account from "../../types/Account";
import Proposal from "../../types/Proposal";

export default function compile(contents: { account: Account; project: Project }): Proposal {

    let account: Account = contents.account;
    let project: Project = contents.project;

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
            name: generateName(account, project) //	@TODO: Not sure if necessary or accurate right now.
        },
        account,
        project
    };

    function generateSource(version: string, environment: string): string {
        if (version) return `${environment}-${version}`;
        else return `${environment}`;
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