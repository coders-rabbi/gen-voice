// context/ActiveUsersContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    console.log("[ActiveUsers] SOCKET URL:", socketUrl);

    const user = getUserInfo();

    const userId = user?._id;

    if (!userId) {
      console.warn("[ActiveUsers] No userId found, skipping socket connection");
      return;
    }

    if (!socketUrl) {
      console.error("[ActiveUsers] NEXT_PUBLIC_SOCKET_URL is not defined!");
      return;
    }

    console.log("[ActiveUsers] Attempting to connect to:", socketUrl);

    const socket: Socket = io(socketUrl, {
      auth: { userId },
    });

    socket.on("connect", () => {
      console.log("[ActiveUsers] Connected! Socket ID:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("[ActiveUsers] Disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("activeUserCount", (count: number) => {
      console.log("[ActiveUsers] Received count:", count);
      setActiveCount(count);
    });

    socket.on("connect_error", (err) => {
      console.error("[ActiveUsers] Connection error:", err.message);
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
