import Topnotice from "./components/topnotice";
import Image from "next/image";
import breakingImage from "@/assets/home/Frame.png";
import img01 from "@/assets/home/Image1.png";
import img02 from "@/assets/home/img2.jpg";
import img04 from "@/assets/home/img4.jpg";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
import TechnologyCard from "./components/technology";
import NewsCard from "@/components/newsCardHorizontal";
import { getAllBlog } from "@/services/postService";

const Herosection = async () => {
  const posts = await getAllBlog();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 mb-14 gap-4 mt-7">
      <div className="md:col-span-8">
        <div className="flex gap-3 items-center">
          <Image src={breakingImage} alt="gen voice" className="h-auto" />
          <Topnotice />
        </div>

        <div className="mt-3 w-full overflow-hidden rounded-lg -z-10">
          <Image
            src={img01}
            alt="Dynamic Hero Image" // ব্রাউজারকে অপ্টিমাইজেশনের জন্য সাইজ বলে দেওয়া
            className="w-full h-auto object-cover"
          />
        </div>

        <TechnologyCard />
      </div>

      <div className="md:col-span-4 w-full mt-5 md:mt-0">
        <div className="flex flex-row justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-2xl text-[#3E3232] ">New Posts</h2>
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

        {/* <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl items-center">
          <div className="w-[35%] aspect-square relative flex-shrink-0">
            <Image
              src={img04}
              alt="Gen voice"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col flex-1 justify-between h-full gap-2">
            <div>
              <h1 className="font-bold text-gray-800 text-base md:text-lg line-clamp-2 leading-tight mb-1">
                What a Disabled Squirrel Taught Me About Life, Work, and Love
              </h1>

              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                Why it helps to know what it’s like, and the exquisite beauty of
                empathy These days, the wood patio area just outside my kitchen
                door is a riot
              </p>
            </div>

            <div className="flex items-center justify-between bg-blue-50/60 p-2 rounded-xl mt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <Image
                    src={manimg}
                    alt="Author"
                    className="rounded-xl object-cover w-full h-full border-2 border-purple-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 leading-tight">
                    Jon Kantner
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    July 14, 2022
                  </span>
                </div>
              </div>

              <button className="text-blue-500 hover:text-blue-600 p-1 mr-1">
                <GoBookmark className="text-2xl" />
              </button>
            </div>
          </div>
        </div> */}
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
