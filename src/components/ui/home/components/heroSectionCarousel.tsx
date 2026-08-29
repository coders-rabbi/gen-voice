"use client";
import img01 from "@/assets/home/Image1.png";
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

interface NewsProps {
  news: TNews[];
}

export function HeroSectionCarousel({ news }: NewsProps) {
  return (
    <Carousel
      className="w-full relative"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {news?.slice(0, 5).map((item, index) => (
          <CarouselItem key={item._id}>
            <div className="w-full overflow-hidden rounded-xl">
              <Link href={`news/${item?.newsId}`}>
                <Image
                  src={item?.featuredImageUrl}
                  width={1200}
                  height={600}
                  alt={item?.title || "Dynamic Hero Image"}
                  className="w-full max-h-[80vh] object-cover block"
                  priority={index === 0}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute -bottom-12 right-0 hidden md:flex gap-2 z-10">
        <CarouselPrevious className="static translate-y-0 translate-x-0 bg-[#3385FF] text-white" />
        <CarouselNext className="static translate-y-0 translate-x-0 bg-[#3385FF] text-white" />
      </div>
    </Carousel>
  );
}
