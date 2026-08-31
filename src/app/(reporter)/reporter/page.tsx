"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import NewsCardVertical from "@/components/newsCardVertical";
import { ProfileChart } from "@/components/dashboard/profileLineChart";
import PostSatisfactionReaction from "@/components/dashboard/postSatisfactionReaction";
import ProfileInfo from "@/components/dashboard/profileInfo";
import { getSingleReporterAllNews } from "@/services/news/news.service";
import { authkey } from "@/constants/authkey";
import { TNews } from "@/types/news";

const Page = () => {
  const [myNews, setMyNews] = useState<TNews[]>([]);
  const [saveNews, setSaveNews] = useState<TNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const accessToken = localStorage.getItem(authkey);

        if (!accessToken) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const data = await getSingleReporterAllNews(accessToken);
        setMyNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-[#3E3232]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      {/* profile info */}
      <div>
        <ProfileInfo />
      </div>

      {/* profile chart */}
      <div className="grid md:grid-cols-12 gap-4 px-3">
        <div className="grid md:col-span-9 mt-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232]">Post Analysis</h2>
          </div>
          <ProfileChart />
        </div>
        <div className="grid md:col-span-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Satisfaction of Posts</h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-3 gap-1 mx-auto mt-2">
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
          </div>
        </div>
      </div>

      {/* others content */}
      <div className="mt-12 px-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">My Posts</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        {myNews.length === 0 ? (
          <p className="text-[#3E3232] text-sm">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-2">
            {myNews.map((item) => (
              <NewsCardVertical key={item._id} news={item} />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Save Posts</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        {saveNews.length === 0 ? (
          <p className="text-[#3E3232] text-sm flex flex-col justify-center items-center h-50">
            No saved posts yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-4 gap-2">
            {myNews.map((item) => (
              <NewsCardVertical key={item._id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
