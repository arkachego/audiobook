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
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.RECORDING_SAVED, (record: RecordType) => {
        toast({
          description: `Recording ${record.name} has been saved successfully!`,
        });
      });
    }
  }, [ socket ]);

  const startRecorder = async () => {
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
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.current.start();
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
        user_id: localStorage.getItem("user_id"),
      });
    }
  };

  return {
    socket,
    recording,
    paused,
    audioUrl,
    startRecorder,
    pauseRecorder,
    resumeRecorder,
    stopRecorder,
  };
};

export default useRecorder;