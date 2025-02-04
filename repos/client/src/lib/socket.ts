"use client";
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import RecordRTC from 'recordrtc';
import EVENTS from "@/constants/events";
import { RecordType } from "@/types";

const startRecording = Symbol(EVENTS.START_RECORDING);
const appendRecording = Symbol(EVENTS.APPEND_RECORDING);
const stopRecording = Symbol(EVENTS.STOP_RECORDING);
const recordingSaved = Symbol(EVENTS.RECORDING_SAVED);

interface ClientToServerEvents {
  [startRecording]: () => void;
  [appendRecording]: (chunk: Blob) => void;
  [stopRecording]: () => void;
};

interface ServerToClientEvents {
  [recordingSaved]: (record: RecordType) => void;
};

const useSocket = () => {

  const [ stopped, setStopped ] = useState(true);
  const [ paused, setPaused ] = useState(false);
  const [ socket, setSocket ] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  let recorder: RecordRTC | null = null;

  useEffect(() => {
      const instance: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        autoConnect: false,
      });
      setSocket(instance);
  }, []);

  const startRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/webm',
      timeSlice: 1000,
      ondataavailable: (blob) => {
        socket?.emit(appendRecording, blob);
      }
    });
    recorder.startRecording();
    setStopped(false);
    setPaused(false);
  };

  const pauseRecord = () => {
    if (recorder) {
      recorder.pauseRecording();
      setPaused(true);
    }
  };

  const resumeRecord = () => {
    if (recorder) {
      recorder.resumeRecording();
      setPaused(false);
    }
  };

  const stopRecord = () => {
    socket?.emit(stopRecording);
    if (recorder) {
      recorder.stopRecording(() => {
        socket?.emit(stopRecording);
      });
    }
    setStopped(true);
    setPaused(false);
  };

  return {
    stopped,
    paused,
    startRecord,
    pauseRecord,
    resumeRecord,
    stopRecord,
  };
  
};

export default useSocket;
