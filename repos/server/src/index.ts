import Express from "express";
import Http from "http";
import { Server } from "socket.io";
import Morgan from "morgan";
import Routes from "./routes";
import { LogStream } from "./utilities/logger";

const app = Express();
const server = Http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(Morgan('combined', {
  stream: new LogStream(),
}));
app.use(Routes);
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));