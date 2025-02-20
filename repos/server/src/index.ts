import Express from "express";
import Http from "http";
import Morgan from "morgan";
import Cors from "cors";
import Fs from "fs";
import Path from "path";
import Routes from "./routes";
import logger, { LogStream } from "./utilities/logger";
import withSocket from "./utilities/socket";
import errorHandler from "./utilities/error";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Cors({
  origin: process.env.AUDIOBOOK_URL,
}));
app.use(Morgan('combined', {
  stream: new LogStream(),
}));

const publicFolder = Path.resolve(__dirname, "../public");
if (!Fs.existsSync(publicFolder)) {
  Fs.mkdirSync(publicFolder, { recursive: true });
}
app.use(Express.static(publicFolder));
app.use("/", Routes);
app.use(errorHandler);

const server = Http.createServer(app);
withSocket(server, logger);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise, "reason: ", reason);
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed. Cleaning up resources.");
    process.exit(0);
  });
});