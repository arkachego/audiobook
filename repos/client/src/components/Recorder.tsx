"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useRecorder from "@/hooks/use-recorder";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconPlaylist,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
  IconMicrophoneFilled,
} from "@tabler/icons-react";
import Lottie from "lottie-react";
import RecordingAnimation from "@/assets/recording.json";

type CentralContentType = {
  recording: boolean;
  paused: boolean;
};

const CentralContent: React.FC<CentralContentType> = ({ recording, paused }) => {

  return recording && !paused ? (
    <Lottie
      loop={!paused}
      animationData={RecordingAnimation}
      className="w-[342px] h-[146px]"
    />
  ) : (
    <div className="w-100 flex flex-col justify-between h-[146px] py-2">
      <div className="flex gap-1">Press the <IconMicrophoneFilled/> button to initiate/resume the recording.</div>
      <div className="flex gap-1">Press the <IconPlayerPauseFilled/> button to pause the recording.</div>
      <div className="flex gap-1">Press the <IconPlayerStopFilled/> button to stop the recording.</div>
      <div className="flex gap-1">Press the <IconPlaylist/> button to see all of your recordings.</div>
    </div>
  )

};

const Recorder: React.FC = () => {

  const {
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
    if (paused) {
      resumeRecorder();
    }
    else if (recording) {
      pauseRecorder();
    }
    else {
      startRecorder();
    }
  };

  const onStopClick = () => {
    if (recording) {
      stopRecorder();
    }
  };

  return (
    <Card className="bg-neutral-300 max-w-lg">
      <CardHeader className="pb-4">
        <CardTitle>Recorder</CardTitle>
        <CardDescription>Record any song you love to sing!</CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <CentralContent
          recording={recording}
          paused={paused}
        />
      </CardContent>
      <CardFooter className="pt-4 justify-between">
        <div>
          {paused ? 'Paused.' : (recording ? 'Recording...' : 'Ready!')}
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Button size="icon" onClick={onPlaylistClick} className="w-7 h-7">
              <IconPlaylist/>
            </Button>
            <Button size="icon" onClick={onRecordClick} className="w-10 h-10">
              {recording && !paused ? <IconPlayerPauseFilled/> : <IconMicrophoneFilled/>}
            </Button>
            <Button size="icon" onClick={onStopClick} className="w-7 h-7">
              <IconPlayerStopFilled/>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );

};

export default Recorder;
