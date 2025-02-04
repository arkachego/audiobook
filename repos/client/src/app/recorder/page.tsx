"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wavy } from "@/components/ui/wavy";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import {
  IconPlaylist,
  IconPlayerPauseFilled,
  IconPlayerStopFilled,
  IconMicrophoneFilled,
} from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Animation from "@/assets/recording.json";
import { useToast } from "@/hooks/use-toast";

const RecorderPage: React.FC = () => {

  const router = useRouter();
  const { toast } = useToast();
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
    if (stopped) {
      // toast({
      //   title: "Scheduled: Catch up",
      //   description: "Friday, February 10, 2023 at 5:57 PM",
      //   className: "text-xs p-2 h-10 min-h-[40px] w-[200px]",
      // });
    }
    else {
      setStopped(true);
      setPaused(false);
    }
  };

  return (
    <Wavy>
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <Card className="bg-neutral-300 w-72">
          <CardHeader>
            <CardTitle>Recorder</CardTitle>
            <CardDescription>Record any song you love to sing!</CardDescription>
          </CardHeader>
          <CardContent>
            <Lottie
              className="w-44 h-44 mx-auto my-[-30px]"
              animationData={Animation}
              loop={!stopped}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <div>
              Ready / 00:30:24
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <Button size="icon" onClick={onPlaylistClick} className="w-7 h-7">
                  <IconPlaylist/>
                </Button>
                <Button size="icon" onClick={onRecordClick} className="w-10 h-10">
                  {paused || stopped ? <IconMicrophoneFilled/> : <IconPlayerPauseFilled/>}
                </Button>
                <Button size="icon" onClick={onStopClick} className="w-7 h-7">
                  <IconPlayerStopFilled/>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Wavy>
  );

};

export default RecorderPage;
