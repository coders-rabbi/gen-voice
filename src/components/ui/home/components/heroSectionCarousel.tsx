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
import Link from "next/link";

interface PostProps {
  posts: IPost[];
}

export function HeroSectionCarousel({ posts }: PostProps) {
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {posts?.slice(0, 5).map((post, index) => (
          <CarouselItem key={post._id || index}>
            <div className="w-full overflow-hidden rounded-xl">
              <Link href={`news/${post?.postId}`}>
                <Image
                  src={post?.mainImage || img01}
                  width={1200}
                  height={600}
                  alt={post?.title || "Dynamic Hero Image"}
                  className="w-full h-auto object-cover block"
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
