import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaUserShield } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import UpdateRoleForm from "../components/updateForm";

const TitleDetails = {
  title: "Users & Roll",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll", href: "roll-management" },
    { label: "Roll Management", href: "/role-management" },
    { label: "Update Role" },
  ],
};

const page = () => {
  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5 mt-5 lg:mt-0">
          <Link
            href="/dashboard/user-roll/role-management"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <UpdateRoleForm />
      </div>
    </div>
  );
};

export default page;
