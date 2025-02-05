import { UserType, RecordType } from "@/types";
import Axios from "axios";

const fetchProfile: (id: string) => Promise<UserType> = async (id) => {
  const { data } = await Axios({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    method: 'get',
    url: `/profile/${id}`,
  });
  return data;
};

const fetchRecords: (id: string) => Promise<RecordType[]> = async (id) => {
  const { data } = await Axios({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    method: 'get',
    url: `/records/${id}`,
  });
  return data;
};

export { fetchProfile, fetchRecords };
