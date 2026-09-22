"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/services/traffic";
import { authkey } from "@/constants/authkey";
import { getFromLocalStorage } from "../../utils/localStorage";

const VisitTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const token = getFromLocalStorage(authkey);
    trackVisit(pathname, token)
      .then((res) => console.log("Visit tracked:", res)) // 👈 এটাও
      .catch((err) => console.error("Visit tracking failed:", err)); // 👈 এটাও
  }, [pathname]);

  return null;
};

export default VisitTracker;
