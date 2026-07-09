import Advertisement from "@/components/advertisement";
import NewsCard from "@/components/newsCardHorizontal";
import { getAllBlog } from "@/services/postService";
import Link from "next/link";
import React from "react";

const Sports = async () => {
  const posts = await getAllBlog();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-2xl text-[#3E3232] ">Sport</h2>
        </div>

        <Link
          href="/"
          className="border border-[#D1E2FD] px-3 py-1.5 rounded-2xl "
        >
          View All
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2.5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:col-end-4 gap-2 my-4">
        {posts.slice(0, 3).map((item) => (
          <NewsCard key={item._id} post={item} />
        ))}
      </div>

      <Advertisement />
    </div>
  );
};

export default Sports;
