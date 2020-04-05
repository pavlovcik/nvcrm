import RenderEngine from "./scripts/render";
import Proposal from "../../../types/Proposal";
import { MetaDataTypesAsInterfaces } from "../../../types/Meta";

export async function downloadFromServer(urls: string[]): Promise<any> {

    return await urls.map(async (url) => await getProjectsAsync(url));

    async function getProjectsAsync(name) {
        return await fetch(name).then(async (response) => {
            return await response.json()
        })
    }
}

export default function uiSetup(
    clientsAPI: string,
    render: { templateId: string, targetId: string, class: string },
    files: MetaDataTypesAsInterfaces[]
) {

    var editMode = false;

    document.body.addEventListener(`keypress`, e => 13 === e.keyCode && saveChangeHandler());
    document.body.addEventListener(`dblclick`, e => {
        // @ts-ignore
        let tryingToEditThisField = e.path[0].getAttribute(`data-source`) ? e.path[0] : false;
        toggleEditMode();
        if (tryingToEditThisField) tryingToEditThisField.focus();
    });

    document.getElementById(`test_post`).onclick = () => {
        nvcrm.store.upload(clientsAPI);
    };
    document.getElementById(`save_changes`).onclick = saveChangeHandler;
    document.getElementById(`edit_mode`).onclick = toggleEditMode;
    document.getElementById(`undo`).onclick = undoChangeHandler;
    document.getElementById(`download_from_server`).onclick = function () {
        console.log({ files });
    };


    function toggleEditMode() {
        editMode = !editMode;
        console.log(`*** quick edit mode toggled ***`);
        let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
        shadowRoots.forEach(article => {
            let sources = article.shadowRoot.querySelectorAll(render.targetId);
            let x = sources.length;
            while (x--) sources[x].setAttribute(`contenteditable`, editMode.toString());
        });

    }

    function undoChangeHandler() {
        new RenderEngine(render.templateId, nvcrm.store.load(), true).render(render.targetId, render.class);
    }



    function saveChangeHandler() {
        /**
         * For those quick edits!!
         *  */

        if (editMode) toggleEditMode();

        let changeLog = [];

        let sources = [];

        let shadowRoots = document.querySelectorAll(`#Spreads>section>article`);
        shadowRoots.forEach(article => {
            let singleSourceCollection = article.shadowRoot.querySelectorAll(render.targetId);
            let x = singleSourceCollection.length;

            while (x--) {
                let singleSource = singleSourceCollection[x];
                sources.push(singleSource);	// @FIXME: not sure of behavior of push will it push the entire domstringlist as one element in array?
            }

        });

        let x = sources.length;

        while (x--) {
            let source = sources[x];
            let parsedContent = source.textContent.trim();
            let address = sources[x].getAttribute(`data-source`);
            let before = eval(`app.store._state.${address}`);
            let after = parsedContent;

            if (before != after) {
                //	Caching system required to know if a property value was just changed right now by a user.
                let y = changeLog.length;
                let skipme = false; //	If the property was modified then skip checking all future occurences. @TODO: render and store all instances of property.
                while (y--) {
                    if (changeLog[y].address == address) {
                        skipme = true;
                        break;
                    }
                }

                if (skipme) {
                    continue;
                }

                let logfile = {
                    before,
                    after,
                    address,
                    type: address.split(`.`).shift()
                };

                changeLog.push(logfile);

                console.log(`"${address}" updated from "${before}" to "${after}"!`);
                eval(`app.store._state.${address} = after`); //	update model

                new RenderEngine(render.templateId, app.store._state, true).render(render.targetId, render.class); // @FIXME: check if can use `(nv?)app.store.load()` or must use `app.store._state`
            }
        }
        console.log({ changeLog });
        x = changeLog.length;
        if (x) app.store._state.meta.updated = new Date().toISOString();

        let types = [];
        while (x--) types.push(changeLog[x].type);

        let modifiedCategories = types.filter((item, i, ar) => ar.indexOf(item) === i);

        if (modifiedCategories.includes(`account`)) app.store._state.account.meta.updated = new Date().toISOString();
        if (modifiedCategories.includes(`project`)) app.store._state.project.meta.updated = new Date().toISOString();

        console.log(`*** changes saved ***`);
        console.log({ modifiedCategories });
        app.store.write(app.store._state);
    }
}
