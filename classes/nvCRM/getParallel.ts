import { resolve as urlToolsResolver } from "url";
import get from "./get";

export default async function getParallel(...args: string[]): Promise<any> {
    let responses: any[] = await Promise.all(args.map(function requestAsync(url) {
        url = urlToolsResolver(window.location.href, url);
        return new Promise((resolve, reject) => {
            get(url, resolve, reject);
        });
    }));
    return responses
}