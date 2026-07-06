import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import { IoIosArrowForward, IoMdPaperPlane } from "react-icons/io";
import { FaAlignLeft, FaImage, FaPen, FaRegFolderOpen } from "react-icons/fa6";
import { HiCodeBracket } from "react-icons/hi2";
import { CiLink } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import CompanyInformation from "@/components/companyInformation";
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
        <form action="" className="px-4 md:px-0">
          <div className="md:grid grid-cols-3 gap-6">
            <div>
              <legend className="fieldset-legend text-black">Name</legend>
              <input
                type="text"
                className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                placeholder="Type here"
              />
            </div>
            <div>
              <legend className="fieldset-legend text-black">Subject</legend>
              <input
                type="text"
                className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                placeholder="Type here"
              />
            </div>
            <div>
              <legend className="fieldset-legend text-black">Email</legend>
              <input
                type="text"
                className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                placeholder="Type here"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12  mt-5">
            <div className="md:col-span-9 rounded-xl">
              <h4 className="mb-2">Description</h4>
              <div className="p-4 shadow-sm rounded-2xl">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 py-2">
                  <button className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]">
                    <FaImage />
                    Image
                  </button>
                  <button className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]">
                    <FaPen />
                    Color
                  </button>
                  <button className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]">
                    <HiCodeBracket />
                    Text
                  </button>
                  <button className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]">
                    <FaAlignLeft />
                    Align
                  </button>
                  <button className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]">
                    <CiLink />
                    Link
                  </button>
                </div>
                <textarea
                  className="textarea h-[150px] rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
                  placeholder="Type..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl">
                <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
                  Add File
                </h3>

                <div className="w-full py-8 bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-[#F3F4F6]">
                  <input type="file" className="hidden" accept="image/*" />
                  <div className="text-[#C4C4C4] text-7xl mb-4">
                    <FaRegFolderOpen strokeWidth={0.5} />
                  </div>
                  <p className="text-sm text-[#71717A] text-center mb-5 font-medium"></p>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#E4E4E7] text-[#3F3F46] rounded-xl font-medium shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    <FiPlus className="text-lg text-[#71717A]" />
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#3385FF] hover:bg-[#2570E0] text-white font-medium rounded-xl text-sm shadow-sm transition-all active:scale-95 flex gap-1 items-center"
            >
              <IoMdPaperPlane />
              Send
            </button>
          </div>
        </form>
      </div>
      <CompanyInformation />
    </div>
  );
};

export default page;
