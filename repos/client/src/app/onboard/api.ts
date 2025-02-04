import { UserType } from "@/types";
import Axios from "axios";

const onboardUser: (name: string) => Promise<UserType> = async (name) => {
  const { data } = await Axios({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    method: 'post',
    url: '/onboard',
    data: { name },
  });
  return data;
};

export { onboardUser };
