import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import React from "react";
import ProfileInfo from "@/components/dashboard/profileInfo";
import {
  FaAlignLeft,
  FaEye,
  FaImage,
  FaPen,
  FaPlus,
  FaRegFolderOpen,
} from "react-icons/fa6";
import { HiCodeBracket } from "react-icons/hi2";
import { CiLink } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { MdNoteAdd } from "react-icons/md";
import { BsSend } from "react-icons/bs";

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
      <div className="grid grid-cols-1 md:grid-cols-12 mt-12 gap-6 px-4">
        <div className="md:col-span-9">
          <div className="flex gap-6 w-full">
            {/* Title Input Field */}
            <div className="w-1/2">
              <legend className="fieldset-legend mb-2 block text-black">Title</legend>
              <input
                type="text"
                className="input validator bg-[#EAF3FF] rounded-[10px] w-full text-black"
                placeholder=""
              />
            </div>

            {/* Add Tag Input Field */}
            <div className="w-1/2">
              <legend className="fieldset-legend mb-2 block text-black">Add Tag</legend>
              <label className="input validator bg-[#EAF3FF] rounded-[10px] w-full flex items-center justify-between px-3">
                <input
                  type="text"
                  placeholder=""
                  className="text-black bg-transparent outline-none w-full pr-2"
                />
                <FaPlus className="text-gray-500 cursor-pointer shrink-0" />
              </label>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
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
                className="textarea h-[300px] rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
                placeholder="Type..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Post Anonymously
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <select className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                News Category
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <select className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm">
                  <option>Entertainment</option>
                  <option>Music</option>
                  <option>Food</option>
                  <option>Animal</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              </div>
            </div>
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Selected Media Type
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <select className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm">
                  <option>Image</option>
                  <option>Video</option>
                </select>
              </div>
            </div>
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
          <div className="flex gap-2 mt-6">
            <Link
              href=""
              className="px-4 py-2.5 flex items-center gap-2 bg-[#F5F5F5] rounded-[12px] w-fit"
            >
              <MdNoteAdd /> Draft
            </Link>
            <Link
              href=""
              className="px-4 py-2.5 flex items-center gap-2 bg-[#F5F5F5] rounded-[12px] w-fit"
            >
              <FaEye /> Draft
            </Link>
            <Link
              href=""
              className="px-4 py-2.5 flex items-center gap-2 bg-[#3385FF] text-white rounded-[12px] w-fit"
            >
              <BsSend /> Draft
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
