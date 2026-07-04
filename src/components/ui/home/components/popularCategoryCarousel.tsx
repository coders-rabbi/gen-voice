import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import food from "@/assets/home/food.jpg";
import Image from "next/image";

export function PopularCategoryCarousel() {
  return (
    // মূল ক্যারোসেলে relative এবং overflow-hidden (বা pr-12) ব্যবহার করা হয়েছে
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full relative px-2"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            // ক্যারোসেলের আইটেমগুলোর মাঝে গ্যাপ ঠিক রাখতে pl-4 বা pr-4 ব্যবহার করুন, আইটেমের ভেতর flex-wrap এর দরকার নেই
            className="basis-auto pl-4"
          >
            <div className="relative w-44 h-12 rounded-2xl overflow-hidden cursor-pointer group shadow-md">
              <div className="absolute inset-0 z-10">
                <Image
                  src={food}
                  alt="Food category"
                  fill
                  className="object-cover w-full h-full blur-[3px] scale-105 transition-all group-hover:blur-[1px]"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors" />
              </div>

              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h4 className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                  #Food
                </h4>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* বাটনটিকে ক্যারোসেলের ভেতরে ডান প্রান্তে ফিক্সড করা হয়েছে */}
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-[#3385FF] text-white" />
    </Carousel>
  );
}
