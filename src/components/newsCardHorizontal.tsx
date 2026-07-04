import Image from "next/image";
import img04 from "@/assets/home/img4.jpg";
import manimg from "@/assets/home/man.jpg";
import { GoBookmark } from "react-icons/go";
const NewsCard = () => {
  return (
    <div>
      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 items-center">
        <div className="w-[35%] aspect-square relative flex-shrink-0">
          <Image
            src={img04}
            alt="Gen voice"
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 justify-between h-full gap-2">
          <div>
            <h1 className="font-bold text-gray-800 text-base md:text-lg line-clamp-2 leading-tight mb-1">
              What a Disabled Squirrel Taught Me About Life, Work, and Love
            </h1>

            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              Why it helps to know what it’s like, and the exquisite beauty of
              empathy These days, the wood patio area just outside my kitchen
              door is a riot
            </p>
          </div>

          <div className="flex items-center justify-between bg-blue-50/60 p-2 rounded-xl mt-1">
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
    </div>
  );
};

export default NewsCard;
