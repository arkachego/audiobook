import { Server, Socket } from "socket.io";
import Fs from "fs";
import Path from "path";
import { Logger } from "winston";
import EVENTS from "../constants/events";
import { createRecord } from "../services/record";
import Record from "../models/record";

interface ClientToServerEvents {
  [EVENTS.DISCONNECT]: () => void;
  [EVENTS.APPEND_RECORDING]: (chunk: Buffer) => void;
  [EVENTS.STOP_RECORDING]: (payload: PayloadType) => void;
};

interface ServerToClientEvents {
  [EVENTS.RECORDING_SAVED]: (record: Record) => void;
};

type PayloadType = {
  user_id: string;
};

const withSocket = (server: object, logger: Logger) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://client:5000',
      methods: [ "GET", "POST" ]
    }
  });
  io.on(EVENTS.CONNECT, (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    logger.info(`Client connected: ${socket.id}`);
  
    let audioChunks: Buffer[] = [];

    socket.on(EVENTS.APPEND_RECORDING, (chunk: Buffer) => {
      audioChunks.push(chunk);
    });
  
    socket.on(EVENTS.STOP_RECORDING, (payload: PayloadType) => {
      setTimeout(async () => {
        logger.info(`recording stoped: ${socket.id} ${audioChunks.length}`);
        if (audioChunks.length > 0) {
          const pathParts = __dirname.split(Path.sep);
          pathParts[pathParts.length - 2] = "public";
          pathParts[pathParts.length - 1] = `audio_${Date.now()}.webm`;
          Fs.writeFileSync(pathParts.join(Path.sep), Buffer.concat(audioChunks));
          const record = await createRecord({
            name: pathParts[pathParts.length - 1],
            link: `${process.env.SERVER_URL}/${pathParts[pathParts.length - 1]}`,
            user_id: payload.user_id,
          });
          socket.emit(EVENTS.RECORDING_SAVED, record);
          audioChunks = [];
        }
      }, 1000);
    });
  
    socket.on(EVENTS.DISCONNECT, () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
};

export default withSocket;
