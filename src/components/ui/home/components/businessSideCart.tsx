import { TNews } from "@/types/news";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

interface porstProps {
  posts: TNews;
}

const BusinessSideCart = ({ posts }: porstProps) => {
  return (
    <div>
      <Link href={`news/${posts?.newsId}`}>
        <div className="border-b pb-1.5 mt-1.5">
          <p className="text-xs text-[#6D757F] font-semibold">
            {posts?.categoryId?.categoryName}
          </p>
          <h4 className="text-xs text-[#183354] font-bold mt-1">
            {posts?.title}
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold mt-2">
            <CiCalendar /> {posts?.publishAt?.split("T")[0]}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BusinessSideCart;
