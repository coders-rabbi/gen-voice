import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import { IoIosArrowForward } from "react-icons/io";
const page = () => {
  return (
    <div>
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />
      <div className="flex justify-between items-center mt-12 px-4 md:px-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] flex items-center">
            Home
            <IoIosArrowForward />
          </h2>
        </div>
      </div>

      <div className="flex gap-3 items-center w-full mb-4 px-4 md:px-0">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div>
        <form action="">
          <div>
            <legend className="fieldset-legend text-black">Name</legend>
            <input
              type="text"
              className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5]"
              placeholder="Type here"
            />
            <legend className="fieldset-legend text-black">Subject</legend>
            <input
              type="text"
              className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5]"
              placeholder="Type here"
            />
            <legend className="fieldset-legend text-black">Email</legend>
            <input
              type="text"
              className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5]"
              placeholder="Type here"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
