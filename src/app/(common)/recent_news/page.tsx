import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import NewsCard from "@/components/newsCardHorizontal";
import { getAllBlog } from "@/services/postService";
import { IPost } from "@/types/blogs";

const RecentNews4 = async () => {
  const blogs = await getAllBlog();
  console.log(blogs);
  return (
    <div className="min-h-screen">
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />
      <div className="mt-12 px-3 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Recent News</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:col-end-4 gap-2">
          {blogs?.map((item: IPost) => (
            <NewsCard key={item._id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentNews4;
