import { UserType } from "@/types";
import { TextGenerate } from "./ui/text-generate";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  profile: UserType | null;
};

const UserProfile: React.FC<Props> = ({ profile }) => {

  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 border-b-neutral-400">
      <div>
        {profile && <TextGenerate words={`Hi ${profile?.name}!`}/>}
      </div>
      <Button onClick={() => router.push('/recorder')}>Recorder</Button>
    </div>
  );

};

export default UserProfile;
