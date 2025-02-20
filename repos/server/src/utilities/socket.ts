import { Server, Socket } from "socket.io";
import { Logger } from "winston";
import EVENTS from "../constants/events";
import { createRecord } from "../services/record";
import Record from "../models/record";
import writeFile from "./writer";

type AppendRecordingPayloadType = {
  data: Buffer;
  final: boolean;
};

type StopRecordingPayloadType = {
  user_id: string;
};
interface ClientToServerEvents {
  [EVENTS.DISCONNECT]: () => void;
  [EVENTS.APPEND_RECORDING]: (payload: AppendRecordingPayloadType) => void;
  [EVENTS.STOP_RECORDING]: (payload: StopRecordingPayloadType) => void;
};

interface ServerToClientEvents {
  [EVENTS.RECORDING_SAVED]: (record: Record) => void;
};

const withSocket = (server: object, logger: Logger) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.AUDIOBOOK_URL,
      methods: [ "GET", "POST" ]
    }
  });
  io.on(EVENTS.CONNECT, (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    logger.info(`Client connected: ${socket.id}`);
  
    let lastChunk: boolean = false;
    let audioChunks: Buffer[] = [];

    socket.on(EVENTS.APPEND_RECORDING, (payload: AppendRecordingPayloadType) => {
      const { data, final } = payload;
      if (final) {
        lastChunk = true;
        logger.info(`last chunk received`);
      }
      else {
        audioChunks.push(data);
        logger.info(`chunk appened: ${socket.id} ${audioChunks.length} chunks`);
      }
    });
  
    socket.on(EVENTS.STOP_RECORDING, (payload: StopRecordingPayloadType) => {
      const checkChunks = setInterval(async () => {
        if (lastChunk) {
          clearInterval(checkChunks);
          logger.info(`recording stoped: ${socket.id} ${audioChunks.length}`);
          if (audioChunks.length > 0) {
            const content = await writeFile(audioChunks);
            const record = await createRecord({
              ...content,
              user_id: payload.user_id,
            });
            socket.emit(EVENTS.RECORDING_SAVED, record);
            audioChunks = [];
          }
        }
      }, 500);
    });
  
    socket.on(EVENTS.DISCONNECT, () => {
      lastChunk = false;
      audioChunks = [];
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
};

export default withSocket;
