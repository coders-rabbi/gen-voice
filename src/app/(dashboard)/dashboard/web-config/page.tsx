import PageTitle from "../../components/page-Title";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";

import { MdContactMail } from "react-icons/md";

const TitleDetails = {
  title: "Website Configuration",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Website Configuration" },
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
        <Link
          href=""
          className="flex flex-col items-center gap-7 border border-[#CFDFF7] rounded-md p-5"
        >
          <TiContacts className="text-4xl text-[#005CE8]" />
          <h3>About Us</h3>
        </Link>
        <Link
          href=""
          className="flex flex-col items-center gap-7 border border-[#CFDFF7] rounded-md p-5"
        >
          <MdContactMail className="text-4xl text-[#005CE8]" />
          <h3>Contact Information</h3>
        </Link>
      </div>
    </div>
  );
};

export default page;
