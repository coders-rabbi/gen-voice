import Image from "next/image";
import img04 from "@/assets/home/img4.jpg";
import defaultImage from "@/assets/defaultUser.jpg";
import { FaPlay } from "react-icons/fa6";
import { TNews } from "@/types/news";
import Link from "next/link";
import { isValidImageSrc, getYoutubeThumbnail } from "@/lib/image-utils";
import SaveButton from "./saveButton";

interface NewsCardProps {
  news: TNews;
}

const NewsCard = ({ news }: NewsCardProps) => {
  // video-ke priority deya hocche — page.tsx-er detail page-er sathe consistent
  const isVideo =
    news?.contentType === "Video" &&
    !!news?.videoUrl &&
    news.videoUrl.trim() !== "";

  const youtubeThumb = isVideo ? getYoutubeThumbnail(news.videoUrl) : null;

  const hasValidImage = isValidImageSrc(news?.featuredImageUrl);

  const imageSrc = youtubeThumb
    ? youtubeThumb
    : hasValidImage
      ? news.featuredImageUrl!
      : img04;

  return (
    <div>
      <Link href={`/news/${news?.newsId}`}>
        <div className="flex gap-2 bg-white rounded-xl shadow-sm p-2 border border-gray-100 items-center">
          <div className="w-[35%] relative flex-shrink-0">
            <Image
              src={imageSrc}
              alt={news?.title || "Gen voice"}
              width={200}
              height={200}
              className="rounded-xl object-cover w-full h-[150px]"
            />
            {/* video hole play icon overlay, jate user bujhte pare eta video content */}
            {youtubeThumb && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-black/60 flex items-center justify-center">
                  <FaPlay className="text-white text-sm ml-0.5" />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 justify-between h-full gap-2">
            <div>
              <h1 className="font-semibold text-gray-800 md:text-sm line-clamp-2 mb-1">
                {news?.title}
              </h1>

              <p className="text-xs text-gray-500 line-clamp-2">
                {news?.shortDetails}
              </p>
            </div>

            <div className="flex items-center justify-between bg-blue-50/60 p-1 rounded-xl mt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <Image
                    src={news?.reporterId?.profileImage || defaultImage}
                    alt="Author"
                    width={10}
                    height={10}
                    className="rounded-xl object-cover w-full h-full border-2 border-purple-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 leading-tight">
                    <p>{news?.reporterId?.fullName}</p>
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {news?.publishAt?.slice(0, news.publishAt.indexOf("T"))}
                  </span>
                </div>
              </div>

              <SaveButton
                newsId={news?._id}
                reporterId={news?.reporterId?._id}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;