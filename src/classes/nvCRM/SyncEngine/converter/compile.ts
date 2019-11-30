import Account from "../../../../types/Account";
import Meta from "../../../../types/Meta";
import Project from "../../../../types/Project";
import Proposal from "../../../../types/Proposal";
import self from "../../setup";


export default function compile(contents: Proposal): Proposal {

    let meta: Meta = contents.meta;
    let account: Account = contents.account;
    let project: Project = contents.project;

    return {
        meta: meta || {
            type: "proposal",
            updated: new Date().toISOString(),
            source: generateSource(self.version, self.environment),
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