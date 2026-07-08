import Image from "next/image";
import img04 from "@/assets/home/img4.jpg";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
import { IPost } from "@/types/blogs";
import Link from "next/link";

interface NewsCardProps {
  post: IPost;
}
const NewsCard = ({ post }: NewsCardProps) => {
  return (
    <div>
      <Link href={`/news/${post?.postId}`}>
        <div className="flex gap-2 bg-white rounded-xl shadow-sm p-2 border border-gray-100 items-center">
          <div className="w-[35%] relative flex-shrink-0">
            <Image
              src={img04}
              alt="Gen voice"
              className="rounded-xl object-cover w-full h-[150px]"
            />
          </div>
          <div className="flex flex-col flex-1 justify-between h-full gap-2">
            <div>
              <h1 className="font-semibold text-gray-800 md:text-sm line-clamp-2 mb-1">
                {post?.title}
              </h1>

              <p className="text-xs text-gray-500 line-clamp-2">
                {post?.postDetails}
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
                    Jon Kantner
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    July 14, 2022
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
