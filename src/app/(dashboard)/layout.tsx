// src/app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardSideBar from "./components/dashboardSideBar";
import DashboardNavbar from "./components/dashboardNavBar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { PermissionProvider, usePermission } from "@/context/PermissionContext";
import { navItems } from "@/config/NavConfig";
import OverviewLoading from "@/components/dashboard/dashboardSkeleton";
// আসল guard logic আলাদা inner component এ, কারণ usePermission()
// PermissionProvider এর ভিতরেই কল করতে হবে
const DashboardLayoutInner = ({
  children,
  mobileOpen,
  onDrawerToggle,
}: {
  children: React.ReactNode;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSuperAdmin, hasPermission, isChecking } = usePermission();

  // সবচেয়ে specific (longest) matching path খুঁজে বের করা
  const matchedRoute = navItems
    .filter((item) => pathname.startsWith(item.path))
    .sort((a, b) => b.path.length - a.path.length)[0];

  const isAllowed =
    !matchedRoute ||
    matchedRoute.feature === "overview" ||
    isSuperAdmin ||
    hasPermission(matchedRoute.feature);

  useEffect(() => {
    if (!isChecking && !isAllowed) {
      router.push("/dashboard"); // অথবা /unauthorized
    }
  }, [isChecking, isAllowed, router]);

  if (isChecking) {
    return (
      // <div className="flex items-center justify-center min-h-screen">
      //   <p>checking permissions...</p>
      // </div>

      <OverviewLoading />
    );
  }

  if (!isAllowed) {
    return null; // redirect হওয়ার আগ পর্যন্ত কিছু render হবে না
  }

  return (
    <div className="flex">
      <DashboardSideBar
        mobileOpen={mobileOpen}
        onDrawerToggle={onDrawerToggle}
      />
      <div className="flex-1 min-w-0 bg-[#f5f5f5]">
        <DashboardNavbar onMenuClick={onDrawerToggle} />
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

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
        {/* <p>checking...</p> */}
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <PermissionProvider>
      <DashboardLayoutInner
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      >
        {children}
      </DashboardLayoutInner>
    </PermissionProvider>
  );
};

export default DashboardLayout;
