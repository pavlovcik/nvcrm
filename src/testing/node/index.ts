import path from "path"
import express from "express"
import bodyParser from "body-parser";
import handler from "./crm";

const morgan = require("morgan");



const port = 8000;
const server = express();

server.use(morgan('tiny'))
server.use(bodyParser.json());

// let pathname = path.resolve(__dirname, `static`);
let cwd = process.cwd();
let pathname = `static`;
let bridge = path.join(`dist`, `testing`, `node`);
let final = path.join(bridge, pathname);

// pathname = encodeURI(pathname);
console.log({
    pathname,
    cwd,
    bridge,
    final
 });

server.use(express.static(final));
server.post('/crm/', handler);

server.listen(port, () => console.log(`\t>\thttp://127.0.0.1:${port}\t>\t>`))