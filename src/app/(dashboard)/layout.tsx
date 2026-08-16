// src/app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import DashboardSideBar from "./components/dashboardSideBar";
import DashboardNavbar from "./components/dashboardNavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
