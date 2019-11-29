import Proposal from "../../../types/Proposal";
import Project from "../../../types/Project";
import Account from "../../../types/Account";
import { Environment } from '../setup';

import identify from './identify';
import organize from './organize';
import compile from "./compile";


class SyncStorage {
    proposal: Proposal = null;
    account: Account = null;
    project: Project = null;

    get() {
        console.log(`SyncEngine.store.get`);
        return this.proposal
    }
    set(input: any) {
        console.log(`SyncEngine.store.set`);
        console.log({ input });
        this.proposal = input
        this.account = input.account
        this.project = input.project
    }
    constructor() { }
}

export default function store(environment: Environment): Function {
    /**
      *
      * This selects and returns the correct storage adapter in order to properly handle the different storage function
      * requirements based on the execution environment, which can be either one of the following:
      * the browser, nodejs, and possibly Google Drive.
      *
      */
    let adapter = {
        browser(): Function {
            /*... understands how to work with localStorage */
            return function storage(proposal: Proposal): Proposal {
                console.log(`storing ${proposal}`);
                localStorage[window.location.pathname] = JSON.stringify(proposal);
                return JSON.parse(localStorage[window.location.pathname]);
            }
        },
        node(): Function {
            /*... understands how to work with JSON file storage and fs.write */
            return function storage(proposal: Proposal): Proposal {
                console.log(`storing ${proposal}`);

                const fs = require("fs-extra");
                const accountName = proposal.account.meta.name.toLowerCase().replace(/\//igm, `-`);
                const projectName = proposal.project.meta.name.toLowerCase().replace(/\//igm, `-`);

                // fs.ensureDirSync(`${__dirname}/client/${accountName}`);
                fs.ensureDirSync(`${__dirname}/client/${accountName}/${projectName}/`);
                fs.writeFileSync(`${__dirname}/client/${accountName}/account.json`, JSON.stringify(proposal.account), `UTF-8`);
                fs.writeFileSync(`${__dirname}/client/${accountName}/${projectName}/project.json`, JSON.stringify(proposal.project), `UTF-8`);

                return proposal;
            }
        },
        drive(): Function {
            /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */
            return function storage(index: string): Proposal {
                // console.log(`storing ${proposal}`);
                return null;
            }
        }
    };
    return adapter[environment]();
}