import ProfileInfo from "@/components/dashboard/profileInfo";
import Image from "next/image";
import React from "react";
import banner from "@/assets/writer/writerBanner.jpg";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

const page = () => {
  return (
    <div>
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      {/* profile info */}
      <div>
        <ProfileInfo />
      </div>
      <div className="px-4 mt-12">
        <div className="flex flex-col md:flex-row md:gap-4 w-full">
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              FullName
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              UserName
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              Phone
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 w-full md:mt-3">
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              Email
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              Old Password
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
          <div className="w-full">
            <legend className="fieldset-legend block text-[#3E3232]">
              Password
            </legend>
            <input
              type="text"
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2.5 mt-3">
          <div className="bg-white rounded-xl w-full">
            <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
              Add Profile
            </h3>

            <div className="w-full py-8 bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex gap-2.5 items-center justify-center transition-all hover:bg-[#F3F4F6]">
              <input type="file" className="hidden" accept="image/*" />
              <FaRegFolderOpen
                strokeWidth={0.5}
                className="text-[#C4C4C4] text-7xl mb-4"
              />
              <div>
                <p className="text-sm text-[#71717A] text-center mb-2 font-medium">
                  Drop Image here
                </p>
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
          <div className="bg-white rounded-xl w-full">
            <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
              Add Banner
            </h3>

            <div className="w-full py-8 bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex gap-2.5 items-center justify-center transition-all hover:bg-[#F3F4F6]">
              <input type="file" className="hidden" accept="image/*" />
              <FaRegFolderOpen
                strokeWidth={0.5}
                className="text-[#C4C4C4] text-7xl mb-4"
              />
              <div>
                <p className="text-sm text-[#71717A] text-center mb-2 font-medium">
                  Drop Image here
                </p>
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
      </div>
    </div>
  );
};

export default page;
