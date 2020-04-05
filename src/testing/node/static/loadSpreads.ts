function Spread(html: string, id: string) {
    let section = document.createElement("section");
    let article: any = document.createElement("article");
    section.appendChild(article);
    article = article.attachShadow({ mode: 'open' });
    article.innerHTML = html;
    section.id = id;
    return section
}

export default async function loadSpreads(cb: Function) {
    let input = {
        "spreads":
            [
                "spreads/specs.htm",
                "spreads/statement of work.htm",
                // "spreads/contents.htm",
                "spreads/cover letter.htm",
                "spreads/master services agreement.htm",
                "spreads/signed.htm"
            ]
    };

    let spreads = await _get(...input.spreads);
    let dfg = document.createDocumentFragment();
    spreads.forEach((element, index) => {
        let name = input.spreads[index].split(`/`).pop().split(`.`).shift();
        let id = name.charAt(0).toUpperCase().concat(name.substring(1));
        let spread = Spread(element, id);
        dfg.appendChild(spread);
    });

    document.getElementById("Spreads").appendChild(dfg);
    cb()
}

/**
 * modifed from get module
 */
async function _get(...args: string[]): Promise<any> {
    return await Promise.all(args.map(requestAsync));
}

function requestAsync(url: string): Promise<any> {
    return new Promise((resolve, reject) => getSingle(url, resolve, reject));
}

async function getSingle(url: string, resolve: Function, reject: Function): Promise<any> {
    return new Promise<string>((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (event) => {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                let parsed;
                parsed = xhr.responseText;
                resolve(parsed); //OK
            } else {
                reject(xhr.statusText); //Error
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}
