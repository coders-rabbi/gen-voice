"use client";
import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import RollTable from "./components/roleManagementTabale";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { useEffect, useState } from "react";
import { TRole } from "@/types/role";
import { getRoles } from "@/services/role/role.service";
import { RollTableSkeleton } from "./components/RoleSkeleton";

const TitleDetails = {
  title: "Roll Management",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll", href: "/dashboard/user-roll" },
    { label: "Roll Management" },
  ],
};

const Page = () => {
  const [data, setData] = useState<TRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = getFromLocalStorage(authkey);

  useEffect(() => {
    setIsLoading(true);
    getRoles(token as string)
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5 mt-5 lg:mt-0">
          <Link
            href="/dashboard"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
          <Link
            href="role-management/create-roll"
            className="bg-[#005CE8] text-white border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#F0F6FF] w-fit "
          >
            <FaPlus />
            Create Roll
          </Link>
        </div>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <RollTableSkeleton rows={5} />
        ) : (
          <RollTable data={data} token={token as string} />
        )}
      </div>
    </div>
  );
};

export default Page;
