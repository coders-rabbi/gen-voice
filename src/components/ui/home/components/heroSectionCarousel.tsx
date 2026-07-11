import img01 from "@/assets/home/Image1.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IPost } from "@/types/blogs";
import Image from "next/image";

interface PostProps {
  posts: IPost[];
}

export function HeroSectionCarousel({ posts }: PostProps) {
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full overflow-hidden rounded-xl">
              <Image
                src={posts?.[0]?.mainImage}
                width={1200}
                height={600}
                alt="Dynamic Hero Image"
                className="w-full h-auto object-cover block"
                priority={index === 0}
              />
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
