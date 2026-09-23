import Image from "next/image";
import React from "react";
import { GoBookmark, GoDotFill } from "react-icons/go";
import manimg from "@/assets/home/man2.jpg";
import { TNews } from "@/types/news";
import Link from "next/link";
import SaveButton from "@/components/saveButton";
import { getFeaturedNews } from "@/services/news/news.service";
import { FeaturedNewsCarousel } from "./featuredNewsCarousel";

const FeaturedCategoryCard = async () => {
  const res = await getFeaturedNews();
  const featuredNews = res.data;
  return (
    <div className="relative z-10 md:ml-10 -mt-30 w-[80%] bg-white border p-5 md:p-8 rounded-xl mx-auto">
      <FeaturedNewsCarousel news={featuredNews} />
    </div>
  );
};

export default FeaturedCategoryCard;
