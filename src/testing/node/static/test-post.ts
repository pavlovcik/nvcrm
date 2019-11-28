
(function () {
    let button = document.getElementById(`test_post`);

    let body = { "meta": { "type": "proposal", "updated": "2019-11-25T07:44:19.797Z", "source": "browser-0.1.0", "name": "WAMI/Q4-2019" }, "account": { "meta": { "type": "account", "updated": "2019-11-16T19:44:17.840Z", "source": "1sAHYA3u0ZrbzuQTAfr6FuQPrqnetwsNR", "name": "WAMI" }, "client": { "contact": { "name": "Adam Miranda", "role": "Founder", "email": "adam@wamilive.com", "address": "3230 South Western Ave. Chicago, 60608", "phone": "‭+1 (312) 860-9166‬" }, "entity": { "dba": "WAMI", "name": "Wami Live Inc." } }, "agent": { "name": "Alexander V. Pavlovcik", "role": "Chief Executive Officer", "email": "alexander@inventum.digital" } }, "project": { "meta": { "type": "project", "updated": "2019-11-16T19:44:17.840Z", "source": "1ZBHCrZnM_hsQd9NQt8zFuQxXhedjKgSh", "name": "Q4-2019" }, "start": "2019-11-16T19:44:17.840Z", "deposit": 5000, "reason": "completing the WAMI V2 project, according to the attached technical specification", "services": [{ "title": "Software Development", "description": "Implementation of WAMI V2 based on the provided technical specification.", "budget": 6000, "duration": { "weeks": 5, "track": 0 }, "deliverables": [{ "title": "USA Localization + Miscellaneous", "description": "" }, { "title": "Events Creation", "description": "" }, { "title": "Featured Events", "description": "" }, { "title": "Email Service", "description": "" }, { "title": "Super Administrator", "description": "" }, { "title": "Customer Profile", "description": "" }] }, { "title": "Quality Assurance", "description": "Testing features on an ad-hoc basis.", "budget": 2000, "duration": { "weeks": 1, "track": 0 }, "deliverables": [] }, { "title": "User Interface Adjustments", "description": "User interface adjustments on an ad-hoc basis.", "budget": 1000, "duration": { "weeks": 1, "track": 0 }, "deliverables": [] }, { "title": "Product Consulting", "description": "Working closely with you in order to guide costs and feature development.", "budget": 0, "duration": { "weeks": 6, "track": 1 }, "deliverables": [] }, { "title": "Software Documentation", "description": "Ensure that all development configurations and enviroments are properly documented for future developer handoff.", "budget": 3000, "duration": { "weeks": 2, "track": 0 }, "deliverables": [{ "title": "Technical Specification", "description": "This document clearly lists every feature and task that the developer must include to ensure a smooth, client approved, development cycle." }, { "title": "Annotated Code", "description": "Complicated functions and files will have annotations to better describe details for new developers to pick up where we left off." }] }, { "title": "Internal Software Insurance Policy", "description": "Internal systems (features that do not require API keys from third parties to function) are fully covered for 180 days from the start of this agreement. This policy is void if any unauthorized modifications were made to WAMI software, any WAMI related cloud infrastructure (such as on AWS) and any of the WAMI servers' configurations by any individual outside of Inventum Digital.", "budget": 0, "duration": { "weeks": 24, "track": 3 }, "deliverables": [] }] } };

    button.onclick = () => fetch(
        "/crm/",
        {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json; charset=UTF-8",
                "pragma": "no-cache",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            }, "referrer": "/",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify(body),
            "method": "POST",
            "mode": "cors"
        });


})();