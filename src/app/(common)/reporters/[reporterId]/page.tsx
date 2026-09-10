import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import NewsCardVertical from "@/components/newsCardVertical";
import manImage from "@/assets/home/man2.jpg";
import { getAllNews } from "@/services/news/news.service";
import Link from "next/link";
import { FaPlus, FaStar, FaUser } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";

const page = async () => {
  const data = await getAllNews();
  const myNews = data.filter((item) => item?.reporterId?.id === "REP-0005");
  return (
    <div className="">
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2.5 px-4">
        {/* Image + Name */}
        <div className="flex gap-2.5 items-center shrink-0">
          <Image
            src={manImage}
            alt="gen voice"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-[12px]"
          />
          <h2 className="text-sm md:text-[16px] font-medium">
            Louis Hoebregts
          </h2>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-x-10">
          <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
            <FaStar className="text-[#3385FF]" /> Rate : 4.2
          </p>
          <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
            <FaUser className="text-[#3385FF]" /> Follower : 4.2
          </p>
          <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
            <FaUser className="text-[#3385FF]" /> News : 4.2
          </p>
        </div>

        {/* Buttons */}
        <Link
          href=""
          className="flex items-center justify-center gap-2 text-[#3385FF] text-xs py-2.5 px-4 border rounded-[12px] whitespace-nowrap"
        >
          <FaPlus />
          Follow
        </Link>
      </div>

      {/* others content */}
      <div className="mt-12 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Latest News</h2>
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
          {myNews.map((item) => (
            <NewsCardVertical key={item._id} news={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
