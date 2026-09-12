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
import {
  getAllNews,
  getNewsByCategory,
  getNewsByReporterId,
} from "@/services/news/news.service";
import { getAllReporter } from "@/services/reporter/reporterService";
import NewsDetailsSkeleton from "../components/newsDetailsSkeleton";
import { splitContentAtMidpoint } from "../components/splitContent";
import { TNews } from "@/types/news";
import NewsCard from "@/components/newsCardHorizontal";
import CommentForm from "../components/commentForm";
import NewsComments from "../components/newsComments";
import { getCommentsByNewsId } from "@/services/comments";
import { TComments } from "@/types/comment.type";
import RelatedNews from "../components/relatedNews";
import NewsViewTracker from "../components/viewCountracker";

interface PageProps {
  params: Promise<{
    newsDetails: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const { newsDetails } = await params;

  const data = await getAllNews();
  const news = data.filter((news) => news?.newsId === newsDetails);

  if (!news.length) {
    return <NewsDetailsSkeleton />;
  }

  const { first, second } = splitContentAtMidpoint(news?.[0]?.content);

  const resporters: TReporter[] = await getAllReporter();
  const featuredReporter = resporters[0];

  const reporterOthersNews: TNews[] = await getNewsByReporterId(
    news?.[0]?.reporterId?._id,
  );

  const withOutDisplayNews = reporterOthersNews.filter(
    (item) => item?.newsId !== newsDetails,
  );

  const res = await getCommentsByNewsId(news?.[0]?.newsId);
  const comments: TComments[] = Array.isArray(res?.data) ? res.data : [];

  const categoryRes = await getNewsByCategory(news?.[0]?.categoryId?._id);
  const categoryNews = categoryRes.data;
  const categoryWithOutDisplayNews = categoryNews.filter(
    (item) => item?.newsId !== newsDetails,
  );

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <h1 className="text-xl md:text-3xl text-black">{news?.[0]?.title}</h1>
          <Image
            src={news?.[0]?.featuredImageUrl}
            alt={news?.[0]?.title}
            width={1200}
            height={800}
            className="w-full h-[60vh] object-cover rounded-[10px] my-5"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
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
                comments : {news?.[0]?.commentCount}
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
            <div className="mt-10">
              <div dangerouslySetInnerHTML={{ __html: first }} />
              <Advertisement />
              {second && <div dangerouslySetInnerHTML={{ __html: second }} />}
            </div>
          </div>

          {/* reader comment section */}
          <div className="my-12">
            <NewsComments comments={comments} />

            {/* comment form */}
            <CommentForm newsId={news?.[0]?.newsId} />
          </div>
          <NewsViewTracker newsId={news?.[0]?.newsId} />
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
          {featuredReporter ? (
            <ReporterCard
              key={featuredReporter?._id}
              reporter={featuredReporter}
              reporterNewsLength={reporterOthersNews.length}
            />
          ) : null}
          <div className="flex items-center gap-2 mb-2 mt-10">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Tags</h2>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
          <div className="mt-5 flex gap-4 flex-wrap">
            {news?.[0]?.tags?.map((item, index) => (
              <Link
                href=""
                key={index + 1}
                className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* reporter uploaded news */}
          <div className="flex items-center gap-2 mb-2 mt-10">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">User's Uploaded News</h2>
          </div>
          <div className="flex gap-3 items-center w-full mb-2">
            <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
            <div className="flex flex-col gap-0.5 flex-1">
              <hr className="w-full border-t border-[#3384FE33]" />
              <hr className="w-full border-t border-[#3384FE33]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {withOutDisplayNews?.slice(0, 4).map((item: TNews) => (
              <NewsCard key={item?._id} news={item} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <RelatedNews news={categoryWithOutDisplayNews} />
      </div>
    </div>
  );
};

export default page;
