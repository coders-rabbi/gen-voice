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

const Page = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const userInfo = getUserInfo();
  const reporterData = useSingleReporter(userInfo?._id as string);

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
        <FormProfileInfo reporter={reporterData?.data as TReporter} />
      </div>

      <CreateNewsForm categories={categories} reporterId={reporterData?.data?._id as string} />
    </div>
  );
};

export default Page;
