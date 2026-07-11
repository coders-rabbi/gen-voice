import Topnotice from "./components/topnotice";
import Image from "next/image";
import breakingImage from "@/assets/home/Frame.png";
import img01 from "@/assets/home/Image1.png";
import TechnologyCard from "./components/technology";
import NewsCard from "@/components/newsCardHorizontal";
import { getAllBlog } from "@/services/postService";
import Link from "next/link";
import { HeroSectionCarousel } from "./components/heroSectionCarousel";
import { IPost } from "@/types/blogs";

const Herosection = async () => {
  const posts: IPost[] = await getAllBlog();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 mb-14 gap-4 ">
      <div className="md:col-span-8">
        <div className="flex gap-3 items-center">
          <Image src={breakingImage} alt="gen voice" className="h-auto" />
          <Topnotice />
        </div>

        {/* <div className="mt-3 w-full overflow-hidden rounded-lg -z-10">
          <Image
            src={img01}
            alt="Dynamic Hero Image" // ব্রাউজারকে অপ্টিমাইজেশনের জন্য সাইজ বলে দেওয়া
            className="w-full h-auto object-cover"
          />
        </div> */}
        <HeroSectionCarousel posts={posts} />

        <TechnologyCard />
      </div>

      <div className="md:col-span-4 w-full mt-5 md:mt-0">
        <div className="flex flex-row justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <Link href="/recent_news" className="text-2xl text-[#3E3232] ">
              New Posts
            </Link>
          </div>
          <button className="btn btn-info border-1 bg-transparent rounded-2xl text-[#3385FF] font-medium ">
            Show All
          </button>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
          {posts.slice(0, 3).map((item) => (
            <NewsCard key={item._id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Herosection;
