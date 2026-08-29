// src/components/dashboard/DashboardSidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo/logo.svg";

interface DashboardSidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const DRAWER_WIDTH = 260; // px

const navItems = [
  { label: "Overview", path: "/dashboard" },
  { label: "Categories", path: "/dashboard/categories" },
  { label: "Register Users", path: "/dashboard/register-user" },
  { label: "All News", path: "/dashboard/all-news" },
  { label: "All Polls", path: "/dashboard/all-poll" },
  { label: "User & Rolls", path: "/dashboard/user-roll" },
  { label: "Website Configuration", path: "/dashboard/web-config" },
  { label: "Setting", path: "/dashboard/setting" },
];

const DashboardSidebar = ({
  mobileOpen,
  onDrawerToggle,
}: DashboardSidebarProps) => {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="h-full bg-white" style={{ width: DRAWER_WIDTH }}>
      {/* Logo */}
      {/* <h1 className="text-3xl font-bold mb-10 text-[#E63946]">FLAME</h1> */}
      <div className=" mb-10 w-full flex items-center justify-center shadow">
        <Image src={logo} alt="genVoice logo" className="h-16 w-40 " />
      </div>

      {/* Nav Items */}
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => {
                    // মোবাইলে মেনু আইটেম ক্লিক করলে ড্রয়ার বন্ধ হয়ে যাবে
                    if (mobileOpen) onDrawerToggle();
                  }}
                  className={`block px-4 py-2.5 no-underline transition-colors ${
                    isActive
                      ? "bg-[#F0F6FF] hover:bg-[#bdd8ff] border-l-4 border-l-[#0E5FD9]"
                      : "bg-transparent hover:bg-[#5ca0fe]"
                  }`}
                >
                  <span
                    className={`${
                      isActive
                        ? "text-[#0E5FD9] font-semibold"
                        : "text-[#626C70] font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop - সবসময় দৃশ্যমান, permanent sidebar */}
      <nav className="hidden md:block shrink-0" style={{ width: DRAWER_WIDTH }}>
        <div className="sticky top-0 h-screen" style={{ width: DRAWER_WIDTH }}>
          {sidebarContent}
        </div>
      </nav>

      {/* Mobile - toggle করা যায় এমন temporary drawer */}
      {/* Overlay */}
      <div
        onClick={onDrawerToggle}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 h-full transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: DRAWER_WIDTH }}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default DashboardSidebar;
