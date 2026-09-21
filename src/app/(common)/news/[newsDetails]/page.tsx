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
  bothContent,
} from "@/services/news/news.service";
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
import { getSingleReporterByReporterId } from "@/services/reporter/reporterService";

interface PageProps {
  params: Promise<{
    newsDetails: string;
  }>;
}

// --- Helper: convert a YouTube watch/share URL into an embeddable URL ---
function getEmbedUrl(url: string): string {
  try {
    const u = new URL(url);

    // https://youtu.be/VIDEO_ID?si=...
    if (u.hostname === "youtu.be") {
      const videoId = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return url; // already an embed url
      }
      const videoId = u.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // fallback: return as-is (e.g. already embeddable, or another provider)
    return url;
  } catch {
    return url;
  }
}

const page = async ({ params }: PageProps) => {
  const { newsDetails } = await params;

  const data = await bothContent();
  const newsData = data?.data;
  const news = newsData.filter((news) => news?.newsId === newsDetails);


  if (!news.length) {
    return <NewsDetailsSkeleton />;
  }

  const currentNews = news[0];
  const isVideo =
    currentNews?.contentType === "Video" &&
    !!currentNews?.videoUrl &&
    currentNews.videoUrl.trim() !== "";
  const hasValidImage =
    !!currentNews?.featuredImageUrl &&
    currentNews.featuredImageUrl !== "N/A";

  const { first, second } = splitContentAtMidpoint(currentNews?.content);

  const reporter = await getSingleReporterByReporterId(
    currentNews?.reporterId?._id,
  );

  const reporterOthersNews: TNews[] = await getNewsByReporterId(
    currentNews?.reporterId?._id,
  );

  const withOutDisplayNews = reporterOthersNews.filter(
    (item) => item?.newsId !== newsDetails,
  );
  const res = await getCommentsByNewsId(currentNews?.newsId);
  const comments: TComments[] = Array.isArray(res?.data) ? res.data : [];

  const categoryRes = await getNewsByCategory(currentNews?.categoryId?._id);
  const categoryNews = categoryRes.data;
  const categoryWithOutDisplayNews = categoryNews.filter(
    (item) => item?.newsId !== newsDetails,
  );

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <h1 className="text-xl md:text-3xl text-black">
            {currentNews?.title}
          </h1>

          {/* --- Media: video takes priority, then image, else nothing --- */}
          {isVideo ? (
            <div className="w-full aspect-video rounded-[10px] my-5 overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(currentNews?.videoUrl ?? "")}
                title={currentNews.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : hasValidImage ? (
            <Image
              src={currentNews.featuredImageUrl}
              alt={currentNews.title}
              width={1200}
              height={800}
              className="w-full h-[60vh] object-cover rounded-[10px] my-5"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,..."
            />
          ) : null}

          <div className="flex flex-col md:flex-row  gap-3 justify-between flex-wrap">
            <div className="flex gap-2 md:gap-5">
              <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
                <FaCalendar />
                {currentNews?.publishAt
                  ? new Date(currentNews.publishAt).toISOString().split("T")[0]
                  : "N/A"}
              </p>
              <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
                <FaComment />
                comments : {comments?.length}
              </p>
              <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
                <FaFile />
                Category : {currentNews?.categoryId?.categoryName}
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
            <CommentForm newsId={currentNews?.newsId} />
          </div>
          <NewsViewTracker newsId={currentNews?.newsId} />
        </div>

        <div className="md:col-span-4">
          {/* news reporter card */}
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
          <div>
            <ReporterCard reporter={reporter?.data} />
          </div>
          <div className="flex items-center gap-2 mb-2 mt-10">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Tags</h2>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
          <div className="mt-5 flex gap-4 flex-wrap">
            {currentNews?.tags?.map((item, index) => (
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