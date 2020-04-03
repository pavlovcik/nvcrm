import Proposal from '../../../../types/Proposal';
import compile from './compile';
import identify, { Identified } from './identify';
import organize from './organize';
import Project from '../../../../types/Project';

/**
 *This safely transforms any projectFiles into a proposal in the best way that it can.
 */
export default async function converter(projectFiles: any): Promise<Proposal> {
    return await
        Promise.resolve(projectFiles)
            .then(identify)
            .then(organize)
            .then(compile)
}