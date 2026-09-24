import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import WebFooterPage from "./components/footerBrandingForm";

const TitleDetails = {
  title: "Footer & Branding",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Web-Config", href: "/dashboard/web-config" },
    {
      label: "Footer & Branding",
    },
  ],
};

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle TitleDetails={TitleDetails} />
        <Link
          href="/dashboard/web-config"
          className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <WebFooterPage />
    </div>
  );
};

export default page;
