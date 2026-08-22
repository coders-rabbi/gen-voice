import PageTitle from "../../components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaUserShield } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";

const TitleDetails = {
  title: "Users & Roll",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll" },
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
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <Link href="user-roll/role-management" className="flex flex-col items-center gap-7 border border-[#CFDFF7] rounded-md p-5">
          <FaUserShield className="text-4xl text-[#005CE8]" />
          <h3>Roll Management</h3>
        </Link>
        <Link href="" className="flex flex-col items-center gap-7 border border-[#CFDFF7] rounded-md p-5">
          <RiUserSettingsLine className="text-4xl text-[#005CE8]" />
          <h3>User Management</h3>
        </Link>
      </div>
    </div>
  );
};

export default page;
