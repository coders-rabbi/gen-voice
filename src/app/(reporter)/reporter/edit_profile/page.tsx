"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import defaultCover from "@/assets/writer/writerBanner.jpg";
import ProfileInfo from "@/components/dashboard/profileInfo";
import { getSingleReporterAllNews } from "@/services/news/news.service";
import { TNews } from "@/types/news";
import { authkey } from "@/constants/authkey";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import UpdateProfileForm from "./components/ProfileUpdateForm";
import RepoterSkeleton from "../../components/reporterSkeleton";
import { useUserProfile } from "@/hooks/useUserProfile";

const Page = () => {
  const [myNews, setMyNews] = useState<TNews[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    userData: reporterData,
    error,
    isLoading: isReporterLoading,
    mutate,
  } = useUserProfile();

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
    return <RepoterSkeleton />;
  }

  return (
    <div>
      <Image
        src={reporterData?.coverImage || defaultCover}
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
        reporterId={reporterData?._id}
        defaultValues={reporterData}
        onSuccess={() => mutate()}
      />
    </div>
  );
};

export default Page;
