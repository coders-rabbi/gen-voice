import * as React from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getAllNewsCategories } from "@/services/category";

const isValidImageSrc = (src?: string | null): src is string =>
  !!src &&
  src.trim() !== "" &&
  (src.startsWith("/") || /^https?:\/\//.test(src));

export const PopularCategoryCarousel = async () => {
  const allCategories = await getAllNewsCategories();
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full relative px-2"
    >
      <CarouselContent>
        {allCategories.map((category) => {
          const hasImage = isValidImageSrc(category?.image);

          return (
            <CarouselItem key={category?._id} className="basis-auto pl-4">
              <Link href={`/categories/${category.slug}`}>
                <div className="relative w-44 h-12 rounded-2xl overflow-hidden cursor-pointer group shadow-md">
                  <div className="absolute inset-0 z-10">
                    {hasImage ? (
                      <Image
                        src={category.image as string}
                        alt={`${category?.categoryName} categories`}
                        fill
                        className="object-cover w-full h-full blur-[3px] scale-105 transition-all group-hover:blur-[1px]"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#3385FF] to-[#183354]" />
                    )}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors" />
                  </div>

                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h4 className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                      {category?.categoryName}
                    </h4>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-[#3385FF] text-white" />
    </Carousel>
  );
};
