"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wavy } from "@/components/ui/wavy";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Recorder from "@/components/Recorder";

const RecorderPage: React.FC = () => {

  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      router.replace('/onboard');
    }
  }, []);

  return (
    <Wavy>
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        <Card className="bg-neutral-300 w-72">
          <CardHeader className="pb-4">
            <CardTitle>Recorder</CardTitle>
            <CardDescription>Record any song you love to sing!</CardDescription>
          </CardHeader>
          <CardFooter className="justify-between">
            <Recorder/>
          </CardFooter>
        </Card>
      </div>
    </Wavy>
  );

};

export default RecorderPage;
