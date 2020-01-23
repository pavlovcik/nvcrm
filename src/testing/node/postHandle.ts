import nvCRM from "../../classes/nvCRM/index";

export default (request, response, next) => {
	return nvCRM(request.body)
		.then(ok)
		.catch(fail);

	function ok(crm) {
		console.log(new Date());
		console.log(`*** proposal received ***`);
		// console.log({ crm });
		// debugger;
		console.log(JSON.stringify(crm.store.load(crm.store._state), null, "\t"));
		return response.sendStatus(200);
	}

	function fail(e) {
		response.sendStatus(500);
		throw e;
	}
};
