import { resolve as urlToolsResolver } from "url";
import request from "request";

export default async function downloadAll(...args: string[]): Promise<any> {  //  Promise<Account> | Promise<Project> | Promise<Proposal>

    var responses: any[] = await Promise.all(args.map(function requestAsync(url) {
        url = urlToolsResolver(window.location.href, url);
        return new Promise((resolve, reject) => {
            request(url, (err: any, response: any, body: string) => {
                if (err) return reject(err);
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(err);
                }
            });
        });
    }));
    return responses
}