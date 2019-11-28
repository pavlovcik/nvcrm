import nvCRM from "../../classes/nvCRM/index";

export default (request, response, next) => {
    nvCRM(request.body).then(callback);
    return response.sendStatus(200);
}

function callback(crm) {
    console.log(new Date());
    console.log({ crm });
    console.log({ __dirname });
}
