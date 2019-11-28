import path from "path"
import express from "express"
import bodyParser from "body-parser";
import handler from "./post";

const port = 8000;
const server = express();

server.use(bodyParser.json());

let pathname = `static`;
let bridge = path.join(`dist`, `testing`, `node`);
let final = path.join(bridge, pathname);

server.use(express.static(final));
server.post('/crm/', handler);

server.listen(port, () => console.log(`\t>\thttp://127.0.0.1:${port}\t>\t>`))