import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import NewsUpdateForm from "../components/newsUpdateForm";
import { getSingleNewsByNewsId } from "@/services/news/news.service";

const TitleDetails = {
  title: "News Update",
  subtitle: "Review, approve, and manage news articles across the platform.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "News", href: "/dashboard/all-news" },
    { label: "Update" },
  ],
};

interface paramsProps {
  params: Promise<{ newsId: string }>;
}

const page = async ({ params }: paramsProps) => {
  const { newsId } = await params;
  const data = await getSingleNewsByNewsId(newsId);
  const news = data?.data

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle TitleDetails={TitleDetails} />
        <Link
          href="/dashboard/all-news"
          className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit h-fit"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <NewsUpdateForm news={news}/>
    </div>
  );
};

export default page;
