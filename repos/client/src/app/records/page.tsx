"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Vortex } from "@/components/ui/vortex";

const RecordsPage: React.FC = () => {

  const router = useRouter();

  // useEffect(() => {
  //   const user_id = localStorage.getItem("user_id");
  //   if (!user_id) {
  //     router.replace('/onboard');
  //   }
  // }, []);

  return (
    <Vortex>
      <div className="w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 text-white" style={{ height: 1200 }}>
          Records
        </div>
      </div>
    </Vortex>
  );

};

export default RecordsPage;
