import Proposal from '../../../../types/Proposal';
import compile from './compile';
import identify from './identify';
import organize from './organize';

/**
 *This safely transforms any object into a proposal in the best way that it can.
 */
export default async function converter(object: any[]): Promise<Proposal> {
    return await Promise.resolve(object)
        .then(identify)
        .then(organize)
        .then(compile)
}