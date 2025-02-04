"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const RootPage: React.FC = () => {

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (path === '/') {
      const user_id = localStorage.getItem("user_id");
      router.replace(user_id ? '/records' : '/onboard');
    }
  }, []);

  return null;

};

export default RootPage;
