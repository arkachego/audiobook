import { Server, Socket } from "socket.io";
import { Logger } from "winston";
import EVENTS from "../constants/events";
import { RecordType } from "../types";

const disconnect = Symbol(EVENTS.DISCONNECT);
const startRecording = Symbol(EVENTS.START_RECORDING);
const appendRecording = Symbol(EVENTS.APPEND_RECORDING);
const stopRecording = Symbol(EVENTS.STOP_RECORDING);
const recordingSaved = Symbol(EVENTS.RECORDING_SAVED);
interface ClientToServerEvents {
  [disconnect]: () => void;
  [startRecording]: () => void;
  [appendRecording]: (chunk: Buffer) => void;
  [stopRecording]: () => void;
};

interface ServerToClientEvents {
  [recordingSaved]: (record: RecordType) => void;
};

const withSocket = (io: Server, logger: Logger) => {
  io.on(EVENTS.CONNECT, (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    logger.info(`Client connected: ${socket.id}`);
  
    let audioChunks: Buffer[] = [];
  
    socket.on(startRecording, () => {
      // recording started
    });

    socket.on(appendRecording, (chunk: Buffer) => {
      // chunk received
      audioChunks.push(chunk);
    });
  
    socket.on(stopRecording, () => {
      if (audioChunks.length > 0) {
        // const filename = `audio_${Date.now()}.webm`;
        // const filePath = path.join(AUDIO_DIR, filename);
        // fs.writeFileSync(filePath, Buffer.concat(audioChunks));
  
        socket.emit(recordingSaved, {
          id: '',
          name: '',
          link: '',
          created_at: '',
          updated_at: '',
        });
        // audioChunks = [];
        // logger.info(`Audio saved: ${filename}`);
      }
    });
  
    socket.on(disconnect, () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
};

export default withSocket;
