// import { Request, NextFunction, Response } from 'express';
// export interface RequestCustom extends Request {
//     property: string;
// }

import nvCRM from "../../../classes/nvCRM/index"

export default function handler(request, response, next) {
    // export default function handler(request: RequestCustom, response: Response, next: NextFunction) {

    nvCRM(request.body)
        .then(crm => console.log({ crm }));

    return response.sendStatus(200);
}