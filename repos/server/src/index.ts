import Express from "express";
import Http from "http";
import { Server } from "socket.io";
import BodyParser from "body-parser";
import Morgan from "morgan";
import Cors from "cors";
import Routes from "./routes";
import logger, { LogStream } from "./utilities/logger";
import withSocket from "./utilities/socket";

const app = Express();
const server = Http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});
withSocket(io, logger);

app.use(BodyParser.json());
app.use(Cors({
  origin: process.env.AUDIOBOOK_URL,
}));
app.use(Morgan('combined', {
  stream: new LogStream(),
}));
app.use(Routes);
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));