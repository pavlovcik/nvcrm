import Proposal from "../../../../types/Proposal";

// import { resolve as urlToolsResolver } from "url";

// export default async function post(...args: string[]): Promise<any> {
//     return await Promise.all(args.map(postAsync));
// }

export default async function postAsync(url: string, proposal: Proposal): Promise<any> {
    // url = urlToolsResolver(window.location.href, url);
    return new Promise((resolve, reject) => postSingle(url, proposal, resolve, reject));
}

async function postSingle(url: string, proposal: Proposal, resolve: Function, reject: Function): Promise<any> {
    return new Promise<string>((res, rej) => {
        let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = (event) => {
        //     if (xhr.readyState !== 4) return;
        //     if (xhr.status >= 200 && xhr.status < 300) {
        //         let parsed;
        //         try {
        //             parsed = JSON.parse(xhr.responseText);
        //         } catch (e) {
        //             console.error(`The receiving object failed to parse.`);
        //             reject(xhr.statusText); //Error
        //         }
        //         resolve(parsed); //OK
        //     } else reject(xhr.statusText); //Error
        // };
        xhr.open("POST", url, true);
        xhr.setRequestHeader(`content-type`, `application/json`);
        xhr.send(JSON.stringify(proposal));
    });
}
