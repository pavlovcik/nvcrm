import Proposal from '../../../../types/Proposal';
import compile from './compile';
import identify from './identify';
import organize from './organize';

/**
 *This safely transforms any projectFiles into a proposal in the best way that it can.
 */
export default async function converter(projectFiles: any[]): Promise<Proposal> {
    return await Promise.resolve(projectFiles)
        .then(identify)
        .then(organize)
        .then(compile)
}