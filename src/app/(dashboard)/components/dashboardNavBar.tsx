// src/components/dashboard/DashboardNavbar.tsx
"use client";

import { Menu } from "lucide-react";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
  return (
    <header className="sticky top-0 z-[1200] bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 min-h-[64px]">
        <div className="flex items-center gap-2">
          {/* Mobile menu button - only visible on small screens */}
          <button
            onClick={onMenuClick}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full text-black hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-black font-semibold text-base sm:text-xl">
            ড্যাশবোর্ড
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-black">রাব্বি মিয়া</span>

          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {/* Avatar placeholder - replace with <img> or initials as needed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
