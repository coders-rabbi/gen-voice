import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { MdArrowForwardIos, MdArrowOutward } from "react-icons/md";
import VideoNewsHorizontalCard from "./components/videoNewsHorizontalCard";
import VideoNewsVerticalCard from "./components/videoNewsVerticalCard";
import Advertisement from "@/components/advertisement";
import Politics from "./components/politics";
import NewsLetter from "./components/newsLetter";
import StayConnet from "./components/stayConnet";
import SideCategory from "./components/sideCategory";
import VoteOpinion from "./components/voteOpinion";
import CaltureSideBar from "./components/caltureSideBar";
import BusinessSideBar from "./components/businessSideBar";
import { TNews } from "@/types/news";
import { getAllVideoNews } from "@/services/news/news.service";

interface politicsNewsProps {
  Politicsnews: TNews[];
}

// YouTube লিংক থেকে video ID বের করে embed URL বানানো
// সাপোর্ট করে: watch?v=, youtu.be/, embed/, shorts/
const getYoutubeEmbedUrl = (url?: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/watch")) {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1];
      }
    }

    if (!videoId) return null;

    // extra query/hash অংশ থাকলে বাদ দেওয়া
    videoId = videoId.split("&")[0].split("?")[0];

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};

const VideoNews = async ({ homeNews }: any) => {
  const allVideoNews = await getAllVideoNews();
  const Politicsnews = homeNews?.Politics ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-screen">
      <div className="md:col-span-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-2.5  ">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Video News</h2>
          </div>

          <Link
            href="/video-news"
            className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
          >
            View All
            <MdArrowForwardIos />
          </Link>
        </div>
        <div className="flex gap-3 items-center w-full mt-2.5">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>
        {(() => {
          const item = allVideoNews?.[0];
          if (!item) return null;

          const embedUrl = getYoutubeEmbedUrl(item?.videoUrl ?? "");

          return (
            <div key={item?._id} className="my-4 md:grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg aspect-video bg-black">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={item?.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs">
                    Video not available
                  </div>
                )}
              </div>
              <div>
                <h5 className="text-[#6D757F] text-xs font-semibold mb-2.5 mt-3 md:mt-0">
                  {item?.categoryId?.categoryName}
                </h5>

                <h2 className="text-[#183354] text-[16px] font-bold mb-2.5">
                  {item?.title}
                </h2>
                <div>
                  <div className="flex gap-4 mb-3">
                    <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                      <CiCalendar />
                      {item?.publishAt?.slice(0, item.publishAt.indexOf("T"))}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                      <IoIosTime /> 20 MINS
                    </p>
                  </div>
                  <p className="text-[#6D757F] text-xs line-clamp-4 leading-relaxed">
                    {item?.shortDetails}
                  </p>
                  <Link
                    href={`/news/${item?.newsId}`}
                    className="btn border-1 py-1.5 px-3 flex items-center gap-2 md:w-fit rounded-sm mt-3"
                  >
                    Read More <MdArrowOutward />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {allVideoNews.slice(1, 4).map((item) => (
            <VideoNewsHorizontalCard key={item._id} videoNews={item} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {allVideoNews.slice(2, 5).map((item) => (
            <VideoNewsVerticalCard key={item._id} videoNews={item} />
          ))}
        </div>
        <Advertisement />
        <div>
          <Politics news={Politicsnews} />
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <NewsLetter />
            <BusinessSideBar />
          </div>
          <div className="md:col-span-6">
            <StayConnet />
            <SideCategory news={homeNews} />
            <VoteOpinion />
            <CaltureSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNews;
