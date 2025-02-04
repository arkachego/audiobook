import Express from "express";
import Http from "http";
import BodyParser from "body-parser";
import Morgan from "morgan";
import Cors from "cors";
import Fs from "fs";
import Path from "path";
import Routes from "./routes";
import logger, { LogStream } from "./utilities/logger";
import withSocket from "./utilities/socket";

const app = Express();
app.use(BodyParser.json());
app.use(Cors({
  origin: process.env.AUDIOBOOK_URL,
}));
app.use(Morgan('combined', {
  stream: new LogStream(),
}));

const pathParts = __dirname.split(Path.sep);
pathParts[pathParts.length - 1] = "public";
const publicFolder = pathParts.join(Path.sep);
if (!Fs.existsSync(publicFolder)) {
  Fs.mkdirSync(publicFolder);
}
app.use(Express.static(pathParts.join(Path.sep)));
app.use("/", Routes);

const server = Http.createServer(app);
withSocket(server, logger);

server.listen(3000, () => console.log(`Server running on http://localhost:3000`));