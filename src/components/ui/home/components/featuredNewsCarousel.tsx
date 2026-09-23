"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TNews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { GoDotFill } from "react-icons/go";
import SaveButton from "@/components/saveButton";

interface NewsProps {
  news: TNews[];
}

export function FeaturedNewsCarousel({ news }: NewsProps) {
  return (
    <Carousel
      className="w-full relative"
      plugins={[
        Autoplay({
          delay: 7000,
        }),
      ]}
    >
      <CarouselContent>
        {news?.map((item) => (
          <CarouselItem key={item?._id}>
            <div className="flex justify-between mb-4">
              <Link
                href={`/categories/${item?.categoryId?.categoryName}`}
                className="flex items-center bg-[#3385FF] px-3 py-2 text-white text-xs md:text-sm font-semibold rounded-[6px]"
              >
                <GoDotFill />
                {item?.categoryId?.categoryName}
              </Link>
              <SaveButton
                newsId={item?._id}
                reporterId={item?.reporterId?._id}
              />
            </div>
            <Link
              href={`/news/${item?.newsId}`}
              className="text-sm md:text-[20px] mb-2 md:mb-4 font-semibold text-black"
            >
              {item?.title}
            </Link>
            <div className="flex items-center gap-2">
              <Image
                src={item?.reporterId?.profileImage}
                alt="gen voice"
                className="w-10 md:w-12 h-10 md:h-12 rounded-full "
                width={10}
                height={10}
                unoptimized
              />
              <h1 className="text-[#97989F] text-[10px] md:text-[16px]">
                {item?.reporterId?.fullName}
              </h1>
              <h1 className="text-[#97989F] text-[10px] md:text-[16px]">
                {item?.createdAt.split("T")[0]}
              </h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
