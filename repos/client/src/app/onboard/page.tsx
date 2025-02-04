"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Beams } from "@/components/ui/beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconSend } from "@tabler/icons-react";
import { onboardUser } from "./api";

const OnboardPage: React.FC = () => {

  const router = useRouter();
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState("");

  const onSubmitClick = async () => {
    try {
      if (name.length > 0) {
        setLoading(true);
        const user = await onboardUser(name);
        localStorage.setItem("user_id", user.id);
        router.replace("/recorder");
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      router.replace('/recorder');
    }
  }, []);

  return (
     <div className="w-full h-full bg-neutral-900 relative flex flex-col justify-center items-center antialiased">
      <Card className="bg-neutral-300 w-72 z-10">
        <CardHeader>
          <CardTitle>AudioBook</CardTitle>
          <CardDescription>Record and store your audio logs</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Full Name" value={name} onChange={event => setName(event.target.value)} disabled={loading}/>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="sm" onClick={onSubmitClick} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Please wait</span>
              </>
            ) : (
              <>
                <IconSend/>
                <span>Let me in!</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <Beams/>
    </div>
    
  );

};

export default OnboardPage;
