"use client";

/**
 * 
 * Hook Name        : useSocket
 * 
 * Description      : This hook maintains the socket connection with the server and
 *                    exports a single method to emit any event to the server along
 *                    with the socket itself for any external event binding.
 * 
 */

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) {
      if (socket.disconnected) {
        socket.connect();
      }
      return () => {
        socket.disconnect();
      };
    }
    else {
      const newSocket = io(SERVER_URL, {
        transports: ['websocket', 'polling'],
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const sendEvent = (event: string, data?: any) => {
    if (socket) {
      data ? socket.emit(event, data) : socket.emit(event);
    }
  };

  return {
    socket,
    sendEvent,
  };
};

export default useSocket;
