import Proposal from "../../../../../types/Proposal";
import compile from "../../converter/compile";
import resolver from "../../converter/resolver";
import Meta from "../../../../../types/Meta";
import Project from "../../../../../types/Project";
import Account from "../../../../../types/Account";

const check = {
    meta: (m: Meta): boolean => {
        if (!m?.type) return false
        if (!m?.updated) return false
        if (!m?.source) return false
        if (!m?.name) return false
        return true
    },
    account: (a: Account): boolean => {
        if (!a?.meta) return false
        if (!a?.client) return false
        if (!a?.agent) return false
        return true
    },
    project: (p: Project): boolean => {
        if (!p?.meta) return false
        if (!p?.start) return false
        if (!p?.deposit) return false
        if (!p?.reason) return false
        if (!p?.services) return false
        return true
    }
}

export default {
    /*... understands how to work with localStorage */
    _state: (function () {
        try {
            return JSON.parse(localStorage[window.location.pathname]);
        } catch (e) {
            return null;
        }
    })(),
    load(): Proposal {
        // This should confirm integrity of saved proposal. If corrupted, scrap it.
        let o = this._state as Proposal;
        let integrity = {
            meta: check.meta(o.meta),
            account: check.account(o.account),
            project: check.project(o.project)
        };

        if (integrity.account && integrity.project) {
            if (!integrity.meta) o = compile(o);	//	Can regenerate meta
            return o
        }

        return null
    },
    write(proposal: Proposal) {
        if ("proposal" !== proposal?.meta?.type) throw new TypeError(`Refuse to write non-proposal object to proposal store.`);

        let test = [this._state, proposal].sort(resolver); //  @TODO: fix resolver syntax
        let latest = test.pop();
        this._state = latest;
        localStorage[window.location.pathname] = JSON.stringify(proposal);
    }
};