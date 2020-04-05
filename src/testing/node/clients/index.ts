import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { NextFunction } from "express";

let clientsBasePath = path.join(__dirname, `client`);

import nvCRM from "../../../classes/nvCRM/index";

const HANDLERS = {
	GET: async function GET(request, response, next) {

		fs.readdir(clientsBasePath, "utf8", (err: NodeJS.ErrnoException, files: string[]) => {
			console.log(clientsBasePath);
			console.log(`\t`, files);

			return response.json({ clientsBasePath, files });

		});

	},
	POST: async function POST(request, response, next) {

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

	}
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





ensureDirectoryExists(clientsBasePath, `0744`, function (err) {
	if (err) throw new Error(err) // handle folder creation error
	// else // we're all good
});


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