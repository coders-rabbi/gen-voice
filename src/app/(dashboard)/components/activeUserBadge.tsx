// components/ActiveUsersBadge.tsx
"use client";

import { useActiveUsers } from "@/hooks/useActiveUsers";

export default function ActiveUsersBadge() {
  const { activeCount, isConnected } = useActiveUsers();

  return (
    <div className="border rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
          Live Active Users
        </h3>
        <span
          className={`h-3 w-3 rounded-full ${
            isConnected ? "bg-[#00BC26] animate-pulse" : "bg-gray-300"
          }`}
        />
      </div>
      <p className="text-2xl mb-1.5 font-semibold">{activeCount}</p>
      <p className="text-[#717680] text-sm">
        {isConnected ? "Connected" : "Connecting..."}
      </p>
    </div>
  );
}
