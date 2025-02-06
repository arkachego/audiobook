"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RecordType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import EVENTS from "@/constants/events";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const useSocket = () => {
  const { toast } = useToast();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
    });
    newSocket.on(EVENTS.RECORDING_SAVED, (record: RecordType) => {
      toast({
        description: `Recording ${record.name} has been saved successfully!`,
      });
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  const stopStreaming = () => {
    if (socket) {
      socket.emit(EVENTS.STOP_RECORDING, {
        user_id: localStorage.getItem("user_id"),
      });
    }
  };

  const sendStreaming = (blob: Blob) => {
    if (socket) {
      socket.emit(EVENTS.APPEND_RECORDING, blob);
    }
  };

  return {
    socket,
    stopStreaming,
    sendStreaming,
  };
};

export default useSocket;
