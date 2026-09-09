import Image from "next/image";
import Link from "next/link";
import { BsSend } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import {
  FaCalendar,
  FaComment,
  FaFile,
  FaRegCommentDots,
} from "react-icons/fa6";
import Advertisement from "@/components/advertisement";
import ReporterCard from "@/components/ui/home/components/reporterCard";
import { TReporter } from "@/types/reporter";
import { getAllNews } from "@/services/news/news.service";
import { getAllReporter } from "@/services/reporter/reporterService";
import manImg from "@/assets/home/man.jpg";

interface PageProps {
  params: Promise<{
    newsDetails: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const { newsDetails } = await params;

  const data = await getAllNews();
  const news = data.filter((news) => news?.newsId === newsDetails);

  const resporters: TReporter[] = await getAllReporter();
  const featuredReporter = resporters[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 px-4 gap-4">
      <div className="md:col-span-8">
        <h1 className="text-xl md:text-3xl text-black">{news?.[0]?.title}</h1>
        <Image
          src={news?.[0]?.featuredImageUrl}
          alt={news?.[0]?.title}
          width={1200}
          height={800}
          className="w-full h-[60vh] object-cover rounded-[10px] my-5"
        />
        <div className="flex flex-col md:flex-row  gap-3 justify-between flex-wrap">
          <div className="flex gap-2 md:gap-5">
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaCalendar />
              {news?.[0]?.publishAt
                ? new Date(news[0].publishAt).toISOString().split("T")[0]
                : "N/A"}
            </p>
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaComment />
              {/* comments : {news?.[0]?.totalCommentsCount} */}
              comments : 24
            </p>
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaFile />
              Category : {news?.[0].categoryId?.categoryName}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <BsSend />
              Share
            </Link>
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <CiBookmark />
              Save
            </Link>
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <FaRegCommentDots />
              Comment
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <div dangerouslySetInnerHTML={{ __html: news?.[0]?.content }} />
          <p className="mt-4 text-[#3E3232] text-[16px]">
            {/* {post?.[0]?.subtitles} */}
          </p>
          {/* <p className="bg-[#EAF3FF] text-[#181A2A] p-8 rounded-[12px] text-xs border-l-3 border-[#3385FF] mt-2">
            “ Want to leave your stress on the water? The resort has kayaks,
            paddleboards, or the low-key pedal boats. Snorkeling equipment is
            available as well, so you can experience the ever-changing undersea
            environment. ”
          </p> */}
          <Advertisement />
          {/* <h4 className="text-xl text-[#3E3232] font-semibold">
            Not how long, but how well you have lived is the main thing.
          </h4> */}
          {/* <p className="mt-4 text-[#3E3232] text-[16px]">
            {news?.[0]?.content}
          </p> */}
          {/* <div className="flex items-center">
            <div className="flex gap-3 items-center w-full mt-2.5">
              <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-[#3384FE33]" />
                <hr className="w-full border-t border-[#3384FE33]" />
              </div>
            </div>
            <div className="flex gap-3  w-full mt-2.5">
              <div className="w-8 h-2 rounded-tl-2xl rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-[#3384FE33]" />
                <hr className="w-full border-t border-[#3384FE33]" />
              </div>
            </div>
            <div className="w-8 h-2 rounded-tl-2xl bg-[#3385FF] flex-shrink-0"></div>
          </div> */}
        </div>

        {/* reader comment section */}
        <div className="my-12">
          <div className="flex items-center gap-2 mb-2.5  ">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Comments</h2>
          </div>
          <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
            <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
            <div className="flex flex-col gap-0.5 flex-1">
              <hr className="w-full border-t border-[#3384FE33]" />
              <hr className="w-full border-t border-[#3384FE33]" />
            </div>
          </div>

          <div className="p-4 bg-[#EAF3FF] rounded-xs">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center mb-3">
                <Image
                  src={manImg}
                  alt="gen voice"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4>Rabbi Mia</h4>
                  <p className="flex gap-2 items-center text-[#3E3232BF]">
                    {" "}
                    <FaCalendar /> 2022 04 July
                  </p>
                </div>
              </div>
              <button className="btn btn-ghost bg-[#3E32320D] rounded-xl">
                Reply
              </button>
            </div>
            <p className="text-xs">
              An island (or isle) is an isolated piece of habitat that is
              surrounded by a dramatically different habitat, such as water.
              Very small islands such as emergent land features on atolls can be
              called islets, skerries, cays or keys.
            </p>
          </div>

          {/* comment form */}
          <div>
            <div className="flex items-center gap-2 mb-2.5  mt-12.5">
              <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
              <h2 className="text-xl text-[#3E3232] ">Write Comments</h2>
            </div>
            <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
              <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-[#3384FE33]" />
                <hr className="w-full border-t border-[#3384FE33]" />
              </div>
            </div>
            <form action="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div>
                    <legend className="fieldset-legend text-black">Name</legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <legend className="fieldset-legend text-black">
                      Website
                    </legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <legend className="fieldset-legend text-black">
                      Email
                    </legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <h4 className="mb-2">Comment</h4>
                  <textarea
                    className="textarea h-full rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
                    placeholder="Type..."
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3 py-2 mt-2 bg-[#3385FF] hover:bg-[#2570E0] text-white font-medium rounded-xl text-sm shadow-sm transition-all active:scale-95 flex gap-1 items-center w-fit"
                    >
                      <FaComment />
                      Send Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:col-span-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Reporter Profile</h2>
        </div>
        <div className="flex gap-3 items-center w-full mb-2">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>
        {featuredReporter ? <ReporterCard reporter={featuredReporter} /> : null}
        <div className="flex items-center gap-2 mb-2 mt-10">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Tags</h2>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
        <div className="mt-5 flex gap-4 flex-wrap">
          {news?.[0]?.tags?.map((item) => (
            <Link
              href=""
              className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
