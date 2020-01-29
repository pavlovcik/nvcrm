import Proposal from "../../../../types/Proposal";

export default async function postAsync(url: string, proposal: Proposal): Promise<any> {
    return new Promise((resolve, reject) => postSingle(url, proposal, resolve, reject));
}

async function postSingle(url: string, proposal: Proposal, resolve: Function, reject: Function): Promise<any> {
    return new Promise<string>((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader(`content-type`, `application/json`);
        xhr.send(JSON.stringify(proposal));
    });
}
