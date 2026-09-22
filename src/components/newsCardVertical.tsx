import Image from "next/image";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { TNews } from "@/types/news";
import Link from "next/link";
import SaveButton from "./saveButton";

interface newProps {
  news: TNews;
}

const isValidUrl = (src?: string | null): src is string =>
  !!src && (src.startsWith("/") || /^https?:\/\//.test(src));

const getYouTubeId = (url?: string | null): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};

const NewsCardVertical = ({ news }: newProps) => {
  const hasValidImage = isValidUrl(news?.featuredImageUrl);
  const youtubeId = getYouTubeId(news?.videoUrl);

  let imageSrc: string | typeof manimg = manimg;
  if (hasValidImage) {
    imageSrc = news.featuredImageUrl!;
  } else if (youtubeId) {
    imageSrc = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  return (
    <Link href={`/news/${news?.newsId}`}>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 items-center w-full h-[400px] justify-between">
        <div className="relative w-full h-[200px] flex-shrink-0">
          <Image
            src={imageSrc}
            width={500}
            height={200}
            alt={news?.title ?? "Gen voice"}
            className="rounded-xl object-cover w-full h-full"
          />
          {youtubeId && !hasValidImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <FaPlay className="text-red-600 text-sm ml-0.5" />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-between w-full min-h-0">
          <div className="overflow-hidden">
            <h1 className="font-bold text-gray-800 text-base md:text-lg line-clamp-1 leading-tight mb-1">
              {news?.title}
            </h1>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {news?.shortDetails}
            </p>
          </div>
          <div className="flex items-center justify-between bg-blue-50/60 p-2 rounded-xl mt-3 w-full">
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
                  {news?.categoryId?.categoryName}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {news?.publishAt?.slice(0, news.publishAt.indexOf("T"))}
                </span>
              </div>
            </div>

            <SaveButton newsId={news?._id} reporterId={news?.reporterId?._id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCardVertical;
