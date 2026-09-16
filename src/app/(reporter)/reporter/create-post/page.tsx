"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import CreateNewsForm from "./components/createNewsForm";
import { getAllNewsCategories } from "@/services/category";
import { TCategory } from "@/types/category";
import FormProfileInfo from "./components/formProfileInfo";
import { getUserInfo } from "@/services/actions/auth.service";
import { useSingleReporter } from "@/hooks/useSingleReporter";
import { TReporter } from "@/types/reporter";
import ProfileInfo from "@/components/dashboard/profileInfo";
import useSWR from "swr";
import { TNews } from "@/types/news";
import { getSingleReporterByUserId } from "@/services/reporter/reporterService";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { getSingleReporterAllNews } from "@/services/news/news.service";

const Page = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllNewsCategories();
        setCategories(result);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      <div>
        <ProfileInfo extraDetails={profileExtraDetails} />
      </div>

      <CreateNewsForm
        categories={categories}
        reporterId={reporterData?.data?._id as string}
      />
    </div>
  );
};

export default Page;
