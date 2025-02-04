import { useEffect, useRef, useState } from 'react';
import useSocket from "./use-socket";

const useRecorder = () => {
  const {
    socket,
    stopStreaming,
    sendStreaming,
  } = useSocket();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecorder = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder.current = new MediaRecorder(stream);
    setRecording(true);
    setPaused(false);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
        sendStreaming(event.data);
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
    }
  };

  const resumeRecorder = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      setPaused(false);
    }
  };

  const stopRecorder = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
      setPaused(false);
      stopStreaming();
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