import { TNews } from "@/types/news";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

interface porstProps {
  news: TNews;
}

const BusinessSideCart = ({ news }: porstProps) => {
  return (
    <div>
      <Link href={`news/${news?.newsId}`}>
        <div className="border-b pb-1.5 mt-1.5">
          <p className="text-xs text-[#6D757F] font-semibold">
            {news?.categoryId?.categoryName}
          </p>
          <h4 className="text-xs text-[#183354] font-bold mt-1">
            {news?.title}
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold mt-2">
            <CiCalendar /> {news?.publishAt?.split("T")[0]}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BusinessSideCart;
