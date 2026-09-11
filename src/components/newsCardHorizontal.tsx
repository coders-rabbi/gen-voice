import Image from "next/image";
import img04 from "@/assets/home/img4.jpg";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
import { TNews } from "@/types/news";
import Link from "next/link";

interface NewsCardProps {
  news: TNews;
}
const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div>
      <Link href={`/news/${news?.newsId}`}>
        <div className="flex gap-2 bg-white rounded-xl shadow-sm p-2 border border-gray-100 items-center">
          <div className="w-[35%] relative flex-shrink-0">
            <Image
              src={news?.featuredImageUrl || img04}
              alt="Gen voice"
              width={200}
              height={200}
              className="rounded-xl object-cover w-full h-[150px]"
            />
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
                    src={manimg}
                    alt="Author"
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

              <button className="text-blue-500 hover:text-blue-600 p-1 mr-1">
                <GoBookmark className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
