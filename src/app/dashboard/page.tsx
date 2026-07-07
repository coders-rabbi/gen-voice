import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import NewsCardVertical from "@/components/newsCardVertical";
import { ProfileChart } from "@/components/dashboard/profileLineChart";
import PostSatisfactionReaction from "@/components/dashboard/postSatisfactionReaction";
import ProfileInfo from "@/components/dashboard/profileInfo";

const page = () => {
  return (
    <div className="">
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      {/* profile info */}
      <div>
        <ProfileInfo />
      </div>

      {/* profile chart */}
      <div className="grid md:grid-cols-12 gap-4 px-3 md:px-0">
        <div className="grid md:col-span-9 mt-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232]">Post Analysis</h2>
          </div>
          <ProfileChart />
        </div>
        <div className="grid md:col-span-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232]">Satisfaction of Posts</h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-3 gap-1 mx-auto mt-2">
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
            <PostSatisfactionReaction />
          </div>
        </div>
      </div>

      {/* others content */}
      <div className="mt-12 px-3 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">My Posts</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-2">
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
        </div>

        <div className="flex justify-between items-center mt-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Save Posts</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-2">
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
          <NewsCardVertical />
        </div>
      </div>
    </div>
  );
};

export default page;
