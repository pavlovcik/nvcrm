import Proposal from '../../types/Proposal';

import identify from './identify';
import organize from './organize';
import compile from './compile';
import getParallel from './getParallel'

export default async function puller(...urls: string[]): Promise<Proposal> {

    /**
     * Pass in any URLs, and this should figure out what data
     * it is working with based on meta.type's property value.
     *
     * This should be able to handle the following types:
     * Account, Project and Proposal
     */

    return await getParallel(...urls)
        .then(identify)
        .then(organize)
        .then(compile)
        .then(this.store);
}