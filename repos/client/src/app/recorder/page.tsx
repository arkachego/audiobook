"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wavy } from "@/components/ui/wavy";
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
      <div className="flex justify-center">
        <Recorder/>
      </div>
    </Wavy>
  );

};

export default RecorderPage;
