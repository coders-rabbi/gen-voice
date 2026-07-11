import Image from "next/image";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
import { IPost } from "@/types/blogs";

interface postsProps {
  posts: IPost;
}
const NewsCardVertical = ({ posts }: postsProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 items-center w-full h-[400px] justify-between">
      <div className="relative w-full h-[200px] flex-shrink-0">
        <Image
          src={posts?.mainImage}
          width={500}
          height={200}
          alt="Gen voice"
          className="rounded-xl object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between w-full min-h-0">
        <div className="overflow-hidden">
          <h1 className="font-bold text-gray-800 text-base md:text-lg line-clamp-1 leading-tight mb-1">
            {posts?.title}
          </h1>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {posts?.postDetails}
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
                {posts?.category}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {posts?.postDate}
              </span>
            </div>
          </div>

          <button className="text-blue-500 hover:text-blue-600 p-1 mr-1">
            <GoBookmark className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardVertical;
