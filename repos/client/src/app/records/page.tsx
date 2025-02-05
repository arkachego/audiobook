"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Vortex } from "@/components/ui/vortex";
import { RecordType, UserType } from "@/types";
import { fetchProfile, fetchRecords } from "./api";

const RecordsPage: React.FC = () => {

  const router = useRouter();
  const [ profile, setProfile ] = useState<UserType | null>(null);
  const [ records, setRecords ] = useState<RecordType[]>([]);

  const loadApiData = async (id: string) => {
    try {
      const newProfile = await fetchProfile(id);
      const newRecords = await fetchRecords(id);
      setProfile(newProfile);
      setRecords(newRecords);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadApiData(user_id);
    }
    else {
      router.replace('/onboard');
    }
  }, []);

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
