import Proposal from '../../../types/Proposal';

import identify from './identify';
import organize from './organize';
import compile from './compile';
import Project from '../../../types/Project';

export default async function plugin(object: Proposal | Account | Project): Promise<Proposal> {
    // This is a direct plug in for a <Proposal | Account | Project> designed for express req.body to pass into nvCRM

    return Promise.resolve([object])
        .then(identify)
        .then(organize)
        .then(compile)
        .then(this.store);

}