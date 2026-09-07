import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import { TNews } from "@/types/news";
interface NewsCardProps {
  news: TNews;
}
const PoliticsSideCard = ({ news }: NewsCardProps) => {
  return (
    <div className="flex gap-0.5 border-b pb-1.5">
      <Link href={`/news/${news?.newsId}`}>
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold">
            {news?.categoryId?.categoryName}
          </h5>
          <h3 className="text-[10px] text-[#183354] font-semibold">
            {news?.title}
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold mt-2.5">
            <CiCalendar />{" "}
            {news?.publishAt?.slice(0, news.publishAt.indexOf("T"))}
          </p>
        </div>
      </Link>
      <Image
        src={news?.featuredImageUrl}
        alt="gen voice"
        width={100}
        height={100}
        className="w-24 h-24 object-cover"
      />
    </div>
  );
};

export default PoliticsSideCard;
