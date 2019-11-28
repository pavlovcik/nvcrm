import Proposal from '../../../types/Proposal';

import identify from './identify';
import organize from './organize';
import compile from './compile';
import Project from '../../../types/Project';

export default async function connector(object: Proposal | Account | Project): Promise<Proposal> {
    // This is a direct bridge/plug/connector for a <Proposal | Account | Project> designed for express req.body to pass into nvCRM

    return Promise.resolve([object])
        .then(identify)
        .then(organize)
        .then(compile)
        .then(this.store);

}