import path from "path"
import express from "express"
import bodyParser from "body-parser";
import postHandle from "./postHandle";   //..@FIXME: strange compile bug not finding file.

const port = 8000;
const server = express();
const staticPath = path.join(`dist`, `testing`, `node`, `static`);

server.use(bodyParser.json());
server.use(express.static(staticPath));
server.post('/crm/', postHandle);    //..@FIXME: strange compile bug not finding file.

server.listen(port, () => console.log(`\t>\thttp://127.0.0.1:${port}\t>\t>`));