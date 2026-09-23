// src/components/dashboard/DashboardNavbar.tsx
"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import DemoUser from "@/assets/defaultUser.jpg";
import { RxExit } from "react-icons/rx";
import { getUserInfo, removeUser } from "@/services/actions/auth.service";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { useEffect, useState } from "react";
import { getSingleAdminUser } from "@/services/adminUser/admin.user";
import { TAdmin } from "@/types/admin.type";
import { useAdminProfile } from "@/hooks/useAdminProfile";

type TAdminInfo = {
  _id: string;
  adminName: string;
  email: string;
};

interface DashboardNavbarProps {
  onMenuClick: () => void;
}
const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
  const router = useRouter();
  const { adminData } = useAdminProfile();

  const handleSingOut = () => {
    removeUser();
    router.push("/admin-login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 min-h-16">
        <div className="flex items-center gap-2">
          {/* Mobile menu button - only visible on small screens */}
          <button
            onClick={onMenuClick}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full text-black hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users, posts, polls....."
              className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Image
              src={adminData?.profileImage || DemoUser}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <div className="hidden md:flex md:flex-col gap-0.5 text-xs">
              <h4>{adminData?.adminName || "Loading..."}</h4>
              <h4>ID: {adminData?.email || "..."}</h4>
            </div>
          </div>
          <RxExit
            onClick={handleSingOut}
            className="text-2xl text-[#193CB8] font-bold hover:text-red-500 transition-normal"
            title="Logout"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
