import { UserType } from "@/types";
import { TextGenerate } from "./ui/text-generate";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { IconMicrophoneFilled, IconLogout } from "@tabler/icons-react";

type Props = {
  profile: UserType | null;
};

const UserProfile: React.FC<Props> = ({ profile }) => {

  const router = useRouter();

  const logoutUser = () => {
    localStorage.removeItem("user_id");
    router.replace("/onboard");
  };

  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 border-b-neutral-400">
      <div>
        {profile && <TextGenerate words={`Hi ${profile?.name}!`}/>}
      </div>
      <div className="flex gap-2">
        <Button size="icon" onClick={() => router.push('/recorder')} className="w-8 h-8">
          <IconMicrophoneFilled/>
        </Button>
        <Button size="icon" onClick={logoutUser} className="w-8 h-8">
          <IconLogout/>
        </Button>
      </div>
    </div>
  );

};

export default UserProfile;
