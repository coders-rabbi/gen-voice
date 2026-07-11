import * as React from "react";
import Link from "next/link"; // ১. Next.js Link ইম্পোর্ট করা হলো

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

// ২. প্রতিটি ক্যাটাগরির জন্য একটি নির্দিষ্ট 'slug' বা লিংক পাথ যোগ করা হলো
const categories = [
  { id: 1, name: "Food", tag: "#Food", image: food, slug: "food" },
  { id: 2, name: "Politics", tag: "#Politics", image: food, slug: "politics" },
  { id: 3, name: "Sport", tag: "#Sport", image: food, slug: "sport" },
  {
    id: 4,
    name: "Technology",
    tag: "#Technology",
    image: food,
    slug: "technology",
  },
  { id: 5, name: "Music", tag: "#Music", image: food, slug: "music" },
];

export function PopularCategoryCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full relative px-2"
    >
      <CarouselContent>
        {categories.map((categories) => (
          <CarouselItem key={categories.id} className="basis-auto pl-4">
            {/* ৩. সম্পূর্ণ কার্ডটিকে Link দিয়ে র‍্যাপ (wrap) করা হলো */}
            <Link href={`/categories/${categories.slug}`}>
              <div className="relative w-44 h-12 rounded-2xl overflow-hidden cursor-pointer group shadow-md">
                <div className="absolute inset-0 z-10">
                  <Image
                    src={categories.image}
                    alt={`${categories.name} categories`}
                    fill
                    className="object-cover w-full h-full blur-[3px] scale-105 transition-all group-hover:blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors" />
                </div>

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h4 className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                    {categories.tag}
                  </h4>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-[#3385FF] text-white" />
    </Carousel>
  );
}
