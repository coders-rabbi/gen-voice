"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/actions/auth.service";

export const useAuthGuard = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    console.log("userInfo:", userInfo); // eta ki dekhacche?
    console.log("raw token:", localStorage.getItem("accessToken"));

    if (!userInfo?._id) {
      router.replace("/login");
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [router]);

  return { isChecking, isAuthenticated };
};
