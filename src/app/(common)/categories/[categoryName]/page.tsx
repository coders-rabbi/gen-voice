import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import NewsCard from "@/components/newsCardHorizontal";
import { IoIosArrowForward } from "react-icons/io";
import { getAllBlog } from "@/services/postService";

interface CategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
}

const page = async ({ params }: CategoryPageProps) => {
  const { categoryName } = await params;

  const formattedCategory =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  const data = await getAllBlog();
  const posts = data.filter((item) => item.category === formattedCategory);
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
            <h2 className="text-xl text-[#3E3232] flex items-center">
              Category <IoIosArrowForward />
              {formattedCategory}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mb-4">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-2">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
