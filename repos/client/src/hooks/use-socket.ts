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

let instance: Socket | null = null;

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!instance) {
      instance = io(SERVER_URL, {
        transports: ["websocket", "polling"],
      });
    }

    instance.on("connect_error", (error) => {
      console.error("Socket connection error: ", error);
    });
    instance.on("disconnect", (reason) => {
      console.warn("Socket disconnected: ", reason);
    });

    setSocket(instance);

    return () => {
      if (instance) {
        instance.off();
        instance.disconnect();
        instance = null;
      }
    };
  }, []);

  const sendEvent = (event: string, data?: any) => {
    socket?.emit(event, data);
  };

  return { socket, sendEvent };
};

export default useSocket;