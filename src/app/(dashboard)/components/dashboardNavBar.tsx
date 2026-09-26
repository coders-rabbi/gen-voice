// src/components/dashboard/DashboardNavbar.tsx
"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import DemoUser from "@/assets/defaultUser.jpg";
import { RxExit } from "react-icons/rx";
import { removeUser } from "@/services/actions/auth.service";
import { useRouter } from "next/navigation";
import { useAdminProfile } from "@/hooks/useAdminProfile";

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
