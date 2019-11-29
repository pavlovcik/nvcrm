// import { resolve as urlToolsResolver } from "url";

export default async function get(...args: string[]): Promise<any> {
    return await Promise.all(args.map(requestAsync));
}

function requestAsync(url: string): Promise<any> {
    // url = urlToolsResolver(window.location.href, url);
    return new Promise((resolve, reject) => getSingle(url, resolve, reject));
}

async function getSingle(url: string, resolve: Function, reject: Function): Promise<any> {
    return new Promise<string>((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (event) => {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                let parsed;
                try {
                    parsed = JSON.parse(xhr.responseText);
                } catch (e) {
                    console.error(`The receiving object failed to parse.`);
                    reject(xhr.statusText); //Error
                }
                resolve(parsed); //OK
            } else reject(xhr.statusText); //Error
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}
