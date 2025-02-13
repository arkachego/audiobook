"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Vortex } from "@/components/ui/vortex";
import { RecordType, UserType } from "@/types";
import { fetchProfile, fetchRecords } from "./api";
import UserProfile from "@/components/UserProfile";
import Recordings from "@/components/Recordings";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecordsPage: React.FC = () => {

  const router = useRouter();
  const [ height, setHeight ] = useState<number>(0);
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
      setHeight(window.innerHeight - 154);
    }
    else {
      router.replace('/onboard');
    }
  }, []);

  return (
    <Vortex>
      <div className="w-full h-full p-4 sm:p-10 overflow-hidden">
        <Card className="max-w-lg h-full mx-auto bg-neutral-300 border-0">
          <CardHeader className="p-0">
            <UserProfile profile={profile}/>
          </CardHeader>
          <CardContent className="p-0" style={{ height }}>
            <ScrollArea className="w-full h-full">
              <div className="p-2">
                <Recordings records={records}/>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Vortex>
  );

};

export default RecordsPage;
