"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Beams } from "@/components/ui/beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OnboardPage: React.FC = () => {

  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      router.replace('/recorder');
    }
  }, []);

  return (
     <div className="w-full h-full bg-neutral-900 relative flex flex-col justify-center items-center antialiased">
      <Card className="bg-neutral-300 w-72">
        <CardHeader>
          <CardTitle>AudioBook</CardTitle>
          <CardDescription>Record and store your audio logs</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Full Name"/>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="sm">Let me in!</Button>
        </CardFooter>
      </Card>
      <Beams/>
    </div>
    
  );

};

export default OnboardPage;
