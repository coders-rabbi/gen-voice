import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import basket from "@/assets/home/basket.jpg";
import Image from "next/image";
import { IPost } from "@/types/blogs";
interface NewsCardProps {
  post: IPost;
}
const PoliticsSideCard = ({ post }: NewsCardProps) => {
  return (
    <div className="flex gap-0.5 border-b pb-1.5">
      <Link href={`news/${post?.postId}`}>
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold">
            {post?.category}
          </h5>
          <h3 className="text-[10px] text-[#183354] font-semibold">
            {post?.title}
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold mt-2.5">
            <CiCalendar /> {post?.postDate}
          </p>
        </div>
      </Link>
      <Image src={post?.mainImage} alt="gen voice" width={100} height={100} className="w-24 h-24 object-cover" />
    </div>
  );
};

export default PoliticsSideCard;
