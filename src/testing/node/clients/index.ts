import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { NextFunction } from "express";
import nvCRM from "../../../classes/nvCRM/index";

const CLIENTS_BASE_PATH = path.join(__dirname, `clients`);
const fsp = require('fs').promises;

async function scan2(directoryName = './data', results = []) {
	let files = await fsp.readdir(directoryName, { withFileTypes: true });
	for (let f of files) {
		let fullPath = path.join(directoryName, f.name);
		if (f.isDirectory()) {
			await scan2(fullPath, results);
		} else {
			results.push(fullPath);
		}
	}
	return results;
}

const HANDLERS = {
	GET: GET(),
	POST: POST()
};



export default (request: Request, response: Response, next: NextFunction) => {
	const METHOD = request.method;
	if (HANDLERS[METHOD]) {
		return HANDLERS[METHOD](request, response, next);
	} else {
		response.sendStatus(500);
		return next();
	}
};





ensureDirectoryExists(CLIENTS_BASE_PATH, `0744`, function (err) {
	if (err) throw new Error(err) // handle folder creation error
	// else // we're all good
});


function POST() {
	return async function POST(request, response, next) {
		try {
			const crm = await nvCRM(request.body);
			return ok(crm);
		}
		catch (e) {
			return fail(e);
		}
		function ok(crm) {
			console.log(new Date());
			console.log(`*** proposal received ***`);
			console.log(JSON.stringify(crm.store.load(crm.store._state), null, "\t"));
			return response.sendStatus(200);
		}
		function fail(e) {
			response.sendStatus(500);
			throw e;
		}
	};
}

function GET() {
	return async function GET(request, response, next) {
		let rawPaths = await scan2(CLIENTS_BASE_PATH);
		let x = rawPaths.length;
		let newPaths = [];
		while (x--) {
			let shortPath = rawPaths[x].replace(CLIENTS_BASE_PATH, ``);
			if (!shortPath.includes(`/.`)) {
				newPaths.push(shortPath);
			}
		}
		response.json(newPaths);
	};
}

function ensureDirectoryExists(path, mask, cb) {
	if (typeof mask == 'function') { // allow the `mask` parameter to be optional
		cb = mask;
		mask = `0777`;
	}
	fs.mkdir(path, mask, function (err) {
		if (err) {
			if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
			else cb(err); // something else went wrong
		} else cb(null); // successfully created folder
	});
}