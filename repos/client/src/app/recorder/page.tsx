"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wavy } from "@/components/ui/wavy";
import { Button } from "@/components/ui/button";
import {
  IconPlaylist,
  IconPlayerRecordFilled,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";

const RecorderPage: React.FC = () => {

  const router = useRouter();
  const [ stopped, setStopped ] = useState(true);
  const [ paused, setPaused ] = useState(false);

  // useEffect(() => {
  //   const user_id = localStorage.getItem("user_id");
  //   if (!user_id) {
  //     router.replace('/onboard');
  //   }
  // }, []);

  const onPlaylistClick = () => {
    router.push("/records");
  };

  const onRecordClick = () => {
    if (stopped) {
      setStopped(false);
      setPaused(false);
    }
    else {
      setPaused(!paused);
    }
  };

  const onStopClick = () => {
    setStopped(true);
    setPaused(false);
  };

  return (
    <Wavy>
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-72 text-white">
        <div className="max-w-2xl mx-auto p-4 flex flex-col items-center">
          Top
        </div>
        <div className="flex gap-3 items-center">
          <Button size="icon" className="w-10 h-10 rounded-full" onClick={onPlaylistClick} variant="info" disabled={!stopped}>
            <IconPlaylist/>
          </Button>
          <Button size="icon" className="w-14 h-14 rounded-full" onClick={onRecordClick} variant={paused || stopped ? "success" : "warning"}>
            {paused || stopped ? <IconPlayerRecordFilled/> : <IconPlayerPauseFilled/>}
          </Button>
          <Button size="icon" className="w-10 h-10 rounded-full" onClick={onStopClick} variant="danger" disabled={stopped}>
            <IconPlayerStopFilled/>
          </Button>
        </div>
      </div>
    </Wavy>
  );

};

export default RecorderPage;
