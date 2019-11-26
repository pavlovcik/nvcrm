export default async function get(url: string, resolve, reject): Promise<any> {

	return new Promise<string>((res, rej) => {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function (event) {
			if (xhr.readyState !== 4) return;
			if (xhr.status >= 200 && xhr.status < 300) {
				let parsed;
				try {
					parsed = JSON.parse(xhr.responseText);
				} catch {
					console.error(`The receiving object failed to parse.`);
					reject(xhr.statusText); //Error
				}
				resolve(parsed); //OK
			} else reject(xhr.statusText); //Error
		};
		xhr.open("GET", url, true); //Async
		xhr.send();
	});
}
