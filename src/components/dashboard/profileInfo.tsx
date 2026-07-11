import React from "react";
import manImage from "@/assets/home/man2.jpg";
import Image from "next/image";
import { FaPlus, FaStar, FaUser } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center mt-2.5 px-4">
      <div className="flex gap-2.5 items-center">
        <Image
          src={manImage}
          alt="gen voice"
          className="w-20 h-20 object-cover rounded-[12px]"
        />
        <h2 className="text-[16px] font-medium">Louis Hoebregts</h2>
      </div>
      <div className="flex gap-5 md:gap-10 flex-wrap">
        <p className="flex items-center gap-2.5 text-sm text-[#3E3232BF] text-[#3E3232BF]">
          <FaStar className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2.5 text-sm text-[#3E3232BF] text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2.5 text-sm text-[#3E3232BF] text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2.5 text-sm text-[#3E3232BF] text-[#3E3232BF]">
          <MdOutlinePostAdd className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2.5 text-sm text-[#3E3232BF] text-[#3E3232BF]">
          <PiNotebookBold className="text-[#3385FF]" /> Rate : 4.2
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/dashboard/edit_profile"
          className="flex items-center gap-2.5 text-[#3385FF] py-2.5 pl-4 pr-6 border rounded-[12px]"
        >
          <FaUserEdit />
          Edit Profile
        </Link>
        <Link
          href="dashboard/create_post"
          className="flex items-center gap-2.5 text-white bg-[#3385FF] py-2.5 pl-4 pr-6 border rounded-[12px]"
        >
          <FaPlus />
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
