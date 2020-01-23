function Spread(html: string) {
    let section = document.createElement("section");
    let article = document.createElement("article");
    section.appendChild(article);
    article.innerHTML = html;
    return section
}

export default async function loadSpreads(cb) {
    let input = { "spreads": ["spreads/specs.htm","spreads/statement of work.htm", "spreads/contents.htm", "spreads/cover letter.htm", "spreads/master services agreement.htm", "spreads/signed.htm"] };
    let spreads = await _get(...input.spreads);
    // console.log({spreads});
    let dfg = document.createDocumentFragment();
    spreads.forEach(element => {

        let spread = Spread(element);
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
                // try {
                parsed = xhr.responseText;

                // } catch (e) {
                //     console.error(`The receiving object failed to parse.`);
                //     reject(xhr.statusText); //Error
                // }
                resolve(parsed); //OK
            } else {
                // console.error(xhr.responseURL);
                reject(xhr.statusText); //Error
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}
