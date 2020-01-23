import Account from "../../../../types/Account";
import Project from "../../../../types/Project";
import Proposal from "../../../../types/Proposal";
import { Identified } from "./identify";
import resolve from "./resolver";

// const MAGIC_NUMBER = 0; //  This is because 0 is falsy.

const latest = (a: Account | Project, b: Account | Project): number => {
    const A = new Date(a.meta.updated);
    const B = new Date(b.meta.updated);
    if (A > B) return -1
    else if (A < B) return 1
    else return 0
};

export default function organize(input: { identified: Identified, unexpected: any }): Proposal {

    // @FIXME: this function has really weird interfaces.

    // Compile the Proposal object based on the inputs.

    /**
     * This should produce a { Proposal } object and intelligently consider the different times of different updated components.
     *
     * It should be able to handle receiving the following object types: { Proposal }, { Account }, { Project }, { any }
     * *	and reject { any }
     * *	and give weight to the { Project } being the most likely to be updated the most frequently,
     * * *	then { Account }
     * * *	then { Proposal } (because this is usually generated by software instead of actual human input)
     *
     * This should use the SyncEngine.resolver() ???
     * This seems too tightly coupled with business logic only using queue.identified and should be further abstracted for reusability @TODO: handle queue.unexpected
     *
     */

    let iid = input.identified;

    let proposal = { meta: null, project: null, account: null };

    // @FIXME: this needs to simply add the latest information last, and if that means proposal to clobber everything, so be it. Because loading from cache isn't working...
    if (iid.proposal) {
        // console.log(iid.proposal.sort(resolve));
        proposal = iid.proposal.sort(resolve).shift()
        // @TODO: test if it really is outputting the latest.
    }
    if (iid.account) {
        // console.log(iid.account.sort(latest));
        let account = iid.account.sort(latest).shift();
        if (
            new Date(proposal ?.meta ?.updated || 0) < new Date(account ?.meta ?.updated || 0) &&
            new Date(proposal ?.account ?.meta ?.updated || 0) < new Date(account ?.meta ?.updated || 0)
        ) proposal.account = account
        // @TODO: test if it really is outputting the latest.
    }
    if (iid.project) {
        // console.log(iid.project.sort(latest));
        let project = iid.project.sort(latest).shift();
        if (
            new Date(proposal ?.meta ?.updated || 0) < new Date(project ?.meta ?.updated || 0) &&
            new Date(proposal ?.project ?.meta ?.updated || 0) < new Date(project ?.meta ?.updated || 0)
        ) proposal.project = project

        // @TODO: test if it really is outputting the latest.
    }


    if (!proposal.project) {
        // @TODO: work with the unexpected inputs here
        console.error(`Project information missing.`);
        //
    }
    if (!proposal.account) {
        // @TODO: work with the unexpected inputs here
        console.error(`Account information missing.`);
        //
    }

    // if (!output.project) throw new Error(`Project information missing.`);
    // if (!output.account) throw new Error(`Account information missing.`);

    return proposal
}