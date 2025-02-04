"use client";

import { Wavy } from "@/components/ui/wavy";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AudioRecorder from "@/components/AudioRecorder";

const RecorderPage: React.FC = () => {


  return (
    <Wavy>
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <Card className="bg-neutral-300 w-72">
          <CardHeader className="pb-4">
            <CardTitle>Recorder</CardTitle>
            <CardDescription>Record any song you love to sing!</CardDescription>
          </CardHeader>
          <CardFooter className="justify-between">
            <AudioRecorder/>
          </CardFooter>
        </Card>
      </div>
    </Wavy>
  );

};

export default RecorderPage;
