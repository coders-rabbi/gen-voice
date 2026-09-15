// hooks/useActiveUsers.ts
"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getUserInfo } from "@/services/actions/auth.service";

export function useActiveUsers() {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const user = getUserInfo();
    console.log("Logged in user object:", user);

    if (!user?._id) {
      console.warn("No userId found, skipping socket connection");
      return;
    }

    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { userId: user._id },
    });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("activeUserCount", (count: number) => {
      setActiveCount(count);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { activeCount, isConnected };
}
