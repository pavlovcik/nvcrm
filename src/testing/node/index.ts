import path from "path"
import express from "express"
import bodyParser from "body-parser";
import handler from "./handler";

const server = express();
const port = 8000;

server.use(bodyParser.json())

console.log(__dirname);

server.use(express.static(path.join(__dirname, `./static/`)));
server.post('/crm/', handler);

server.listen(port, () => console.log(`Example app listening on port ${port}!`))