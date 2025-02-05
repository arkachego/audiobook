"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useRecorder from "@/hooks/use-recorder";
import {
  IconPlaylist,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
  IconMicrophoneFilled,
} from "@tabler/icons-react";
import { useEffect } from "react";

const Recorder: React.FC = () => {

  const {
    socket,
    recording,
    paused,
    startRecorder,
    pauseRecorder,
    resumeRecorder,
    stopRecorder,
  } = useRecorder();
  const router = useRouter();

  const onPlaylistClick = () => {
    router.push("/records");
  };

  const onRecordClick = () => {
    if (recording) {
      pauseRecorder();
    }
    else if (paused) {
      resumeRecorder();
    }
    else {
      startRecorder();
    }
  };

  const onStopClick = () => {
    if (recording) {
      stopRecorder();
    }
    else {
      // toast({
      //   title: "Scheduled: Catch up",
      //   description: "Friday, February 10, 2023 at 5:57 PM",
      //   className: "text-xs p-2 h-10 min-h-[40px] w-[200px]",
      // });
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div>
        {recording ? '00:30:24' : 'Ready!'}
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <Button size="icon" onClick={onPlaylistClick} className="w-7 h-7">
            <IconPlaylist/>
          </Button>
          <Button size="icon" onClick={onRecordClick} className="w-10 h-10">
            {recording ? <IconPlayerPauseFilled/> : <IconMicrophoneFilled/>}
          </Button>
          <Button size="icon" onClick={onStopClick} className="w-7 h-7">
            <IconPlayerStopFilled/>
          </Button>
        </div>
      </div>
    </>
  );

};

export default Recorder;
