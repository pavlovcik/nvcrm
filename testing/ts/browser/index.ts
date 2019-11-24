import nvCRM from "../../../classes/nvCRM";
import RenderEngine from './render/index';

(async function () {
    let crm = await nvCRM(`./json/account/index.json`, `./json/account/project/index.json`);
    let renderer = new RenderEngine(`[data-template]`, crm.proposal);
    renderer.render(`[data-source]`, `ready`);

    window["client"] = crm;
    window["render"] = RenderEngine;

    return void 0
})();
