// src/hooks/useAuthGuard.ts
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

    if (!userInfo?._id) {
      router.replace("/login"); // তোমার login route অনুযায়ী change করো
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [router]);

  return { isChecking, isAuthenticated };
};
