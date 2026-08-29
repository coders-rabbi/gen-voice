// src/app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import DashboardSideBar from "./components/dashboardSideBar";
import DashboardNavbar from "./components/dashboardNavBar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isChecking, isAuthenticated } = useAuthGuard();
    const router = useRouter();

   useEffect(() => {
      if (!isChecking && !isAuthenticated) {
        router.push("/login");
      }
    }, [isChecking, isAuthenticated, router]);
  
    if (isChecking) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }
  
    if (!isAuthenticated) {
      return null; // redirect হচ্ছে, ততক্ষণ কিছুই render করো না
    }

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <DashboardSideBar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      <div className="flex-1 min-w-0 bg-[#f5f5f5]">
        <DashboardNavbar onMenuClick={handleDrawerToggle} />

        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
