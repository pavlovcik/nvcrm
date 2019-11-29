import nvCRM from "../../classes/nvCRM/index";

export default (request, response, next) => {

    return nvCRM(request.body)
        .then(ok)
        .catch(fail)

    function ok(crm) {
        console.log(new Date());
        console.log(`*** proposal received ***`);
        console.log({ crm });
        console.log(crm.sync.store);
        return response.sendStatus(200);
    }

    function fail() {
        response.sendStatus(500)
    }
}
