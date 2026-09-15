"use client";

import { useActiveUsers } from "@/hooks/useActiveUsers";

export default function ActiveUserTracker() {
  useActiveUsers(); 
  return null;
}
