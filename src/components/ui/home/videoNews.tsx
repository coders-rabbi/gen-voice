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
import { getAllBlog } from "@/services/postService";

const VideoNews = async () => {
  const data = await getAllBlog();
  const VideoNews = data.filter((item) => item.category === "Video News");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-screen">
      <div className="md:col-span-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-2.5  ">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Video News</h2>
          </div>

          <Link
            href="/"
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

        {VideoNews && VideoNews.length > 0 && (
          <div className="my-4 md:flex flex-col md:flex-row gap-4">
            <div className="min-w-[350px]  overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/bmrN8Cw1zX4?si=1BcxPULozXKg230s`"
                title="YouTube video player"
                style={{
                  border: "none",
                  width: "100vw",
                  // maxWidth: "350px",
                  height: "250px",
                  flexShrink: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h5 className="text-[#6D757F] text-xs font-semibold mb-2.5 mt-3 md:mt-0">
                Sports
              </h5>

              <h2 className="text-[#183354] text-[16px] font-bold mb-2.5">
                {VideoNews?.[0]?.title}
              </h2>
              <div>
                <div className="flex  gap-4 mb-3">
                  <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                    <CiCalendar /> {VideoNews?.[0]?.postDate}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                    <IoIosTime /> 20 MINS
                  </p>
                </div>
                <p className="text-[#6D757F] text-xs line-clamp-4 leading-relaxed">
                  {VideoNews?.[0].postDetails}
                </p>
                <Link
                  href="/"
                  className="btn border-1 py-1.5 px-3 flex items-center gap-2 w-fit rounded-sm mt-3"
                >
                  Read More <MdArrowOutward />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {/* <VideoNewsHorizontalCard /> */}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <VideoNewsVerticalCard />
          <VideoNewsVerticalCard />
          <VideoNewsVerticalCard />
        </div>
        <Advertisement />

        <div>
          <Politics />
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
            <SideCategory />
            <VoteOpinion />
            <CaltureSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNews;
