// context/ActiveUsersContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { getUserInfo } from "@/services/actions/auth.service";

type ActiveUsersContextType = {
  activeCount: number;
  isConnected: boolean;
};

const ActiveUsersContext = createContext<ActiveUsersContextType>({
  activeCount: 0,
  isConnected: false,
});

export function ActiveUsersProvider({ children }: { children: ReactNode }) {
  const [activeCount, setActiveCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const user = getUserInfo();
    const userId = user?._id;

    if (!userId) {
      console.warn("No userId found, skipping socket connection");
      return;
    }

    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { userId },
    });

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("activeUserCount", (count: number) => setActiveCount(count));
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ActiveUsersContext.Provider value={{ activeCount, isConnected }}>
      {children}
    </ActiveUsersContext.Provider>
  );
}

export const useActiveUsersContext = () => useContext(ActiveUsersContext);