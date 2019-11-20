import nvCRM from ".";

import Meta from "../../types/Meta";
import Project from "../../types/Project";
import Account from "../../types/Account";
import Proposal from "../../types/Proposal";

export default function compileProposal(nvcrm: nvCRM, account: Account, project: Project): Proposal {
    return {
        meta: {
            type: "proposal",
            updated: new Date().toISOString(),
            source: generateSource(nvcrm),
            name: generateName(account, project) //	@TODO: ?
        },
        account,
        project
    };

    function generateSource(app: nvCRM): string {
        if (app.version) {
            return `${app.environment}-${app.version}`;
        } else {
            `${app.environment}`;
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