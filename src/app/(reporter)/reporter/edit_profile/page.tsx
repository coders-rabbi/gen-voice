"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import defaultCover from "@/assets/writer/writerBanner.jpg";
import ProfileInfo from "@/components/dashboard/profileInfo";
import { getSingleReporterAllNews } from "@/services/news/news.service";
import { getSingleReporterByUserId } from "@/services/reporter/reporterService";
import { getUserInfo } from "@/services/actions/auth.service";
import { TNews } from "@/types/news";
import { authkey } from "@/constants/authkey";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import UpdateProfileForm from "./components/ProfileUpdateForm";
import RepoterSkeleton from "../../components/reporterSkeleton";

const Page = () => {
  const [myNews, setMyNews] = useState<TNews[]>([]);
  const [loading, setLoading] = useState(true);

  const userInfo = getUserInfo();

  const {
    data: reporterData,
    isLoading: isReporterLoading,
    mutate,
  } = useSWR(
    userInfo?._id ? ["singleReporterByUserId", userInfo._id] : null,
    () => getSingleReporterByUserId(userInfo?._id as string),
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = getFromLocalStorage(authkey);

        if (!token) {
          setLoading(false);
          return;
        }

        const news: TNews[] = await getSingleReporterAllNews(token as string);
        setMyNews(news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const pendingNews = myNews.filter((item) => item?.status === "pending");
  const publishedNews = myNews.filter((item) => item?.status === "published");
  const profileExtraDetails = { pendingNews, publishedNews, reporterData };

  if (loading || isReporterLoading) {
    return  <RepoterSkeleton />;
  }

  return (
    <div>
      <Image
        src={reporterData?.data?.coverImage  || defaultCover}
        alt="gen voice"
        width={500}
        height={500}
        className="w-full h-40 rounded-xl object-center"
        unoptimized
      />

      {/* profile info */}
      <div>
        <ProfileInfo extraDetails={profileExtraDetails} />
      </div>

      <UpdateProfileForm
        reporterId={reporterData?.data?._id}
        defaultValues={reporterData?.data}
        onSuccess={() => mutate()}
      />
    </div>
  );
};

export default Page;