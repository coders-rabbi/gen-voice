import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import CreatePollForm from "./components/createPollForm";

const TitleDetails = {
  title: "Poll Builder",
  subtitle: "Design an interactive poll with multiple question types.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Polls", href: "/dashboard/all-poll" },
    { label: "Builder" },
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
          <button className="btn rounded-2xl border border-[#C0D7FA] bg-[#F0F6FF]">
            Save Draft
          </button>
          <Link
            href="all-poll/create-poll"
            className="bg-[#005CE8] text-white border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#F0F6FF] w-fit "
          >
            Publish Poll
          </Link>
        </div>
      </div>
      <CreatePollForm/>
    </div>
  );
};

export default page;
