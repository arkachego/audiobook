"use client";

/**
 * 
 * Hook Name        : useRecorder
 * 
 * Description      : This hook internally uses the useSocket hook to send the audio stream
 *                    to the server. It exposes methods to start, pause, resume and stop
 *                    recordings.
 * 
 */

import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import useSocket from "./use-socket";
import EVENTS from "@/constants/events";
import { RecordType } from "@/types";

const useRecorder = () => {
  const { toast } = useToast();
  const { socket, sendEvent } = useSocket();
  const [recording, setRecording] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleRecordSave = (record: RecordType) => {
    toast({
      description: `Recording ${record.name} has been saved successfully!`,
    });
  };

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    return () => {
      socket?.off(EVENTS.RECORDING_SAVED, handleRecordSave);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.RECORDING_SAVED, handleRecordSave);
    }
  }, [ socket ]);

  const startRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      mediaRecorder.current = new MediaRecorder(stream);
      setRecording(true);
      setPaused(false);
      audioChunks.current = [];
  
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
          sendEvent(EVENTS.APPEND_RECORDING, event.data);
        }
      };
  
      mediaRecorder.current.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };
  
      mediaRecorder.current.start();

    }
    catch (error) {
      toast({
        description: "Microphone access denied! Please allow access to record audio.",
        variant: "destructive",
      });
    }
  };

  const pauseRecorder = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
      setPaused(true);
      toast({
        description: `Recording has been paused!`,
      });
    }
  };

  const resumeRecorder = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      setPaused(false);
      toast({
        description: `Recording has been resumed!`,
      });
    }
  };

  const stopRecorder = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
      setPaused(false);
      sendEvent(EVENTS.STOP_RECORDING, {
        user_id: userId,
      });
    }
  };

  return {
    socket,
    recording,
    paused,
    startRecorder,
    pauseRecorder,
    resumeRecorder,
    stopRecorder,
  };
};

export default useRecorder;