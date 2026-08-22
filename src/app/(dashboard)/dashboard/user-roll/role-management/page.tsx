import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaUserShield } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { RollTable } from "./components/roleManagementTabale";

const TitleDetails = {
  title: "Roll Management",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll", href: "/dashboard/user-roll" },
    {
      label: "Roll Management",
    },
  ],
};

const page = () => {
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
        <RollTable />
      </div>
    </div>
  );
};

export default page;
