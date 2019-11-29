import get from './xhr/get'

import Proposal from '../../../types/Proposal';
import Account from '../../../types/Account';
import Project from '../../../types/Project';

import identify from './identify';
import organize from './organize';
import compile from './compile';

export default async function puller(...urls: string[]): Promise<Proposal> {

    return await get(...urls)
        .then(identify)
        .then(organize)
        .then(compile)
}