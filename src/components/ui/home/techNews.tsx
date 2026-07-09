import Advertisement from "@/components/advertisement";
import NewsCard from "@/components/newsCardHorizontal";
import { getAllBlog } from "@/services/postService";
import Link from "next/link";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

const TechNews = async () => {
  const data = await getAllBlog();
  const posts = data.filter((post) => post.category === "Technology");
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-[14px] font-semibold text-[#3E3232] ">
            Technology
          </h2>
        </div>

        <Link
          href="/"
          className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
        >
          View All
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2.5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:col-end-4 gap-2 mt-4">
        {posts.slice(0, 6).map((item) => (
          <NewsCard key={item._id} post={item} />
        ))}
      </div>
      <Advertisement />
    </div>
  );
};

export default TechNews;
