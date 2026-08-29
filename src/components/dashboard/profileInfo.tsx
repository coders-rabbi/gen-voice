"use client";
import manImage from "@/assets/home/man2.jpg";
import Image from "next/image";
import { FaPlus, FaStar, FaUser } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { getUserInfo } from "@/services/actions/auth.service";
import { useSingleReporter } from "@/hooks/useSingleReporter";

const ProfileInfo = () => {
  const userInfo = getUserInfo();
  const reporterData = useSingleReporter(userInfo?._id as string);
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2.5 px-4">
      {/* Image + Name */}
      <div className="flex gap-2.5 items-center shrink-0">
        <Image
          src={manImage}
          alt="gen voice"
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-[12px]"
        />
        <h2 className="text-sm md:text-[16px] font-medium">
          {reporterData?.data?.fullName}
        </h2>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-x-10">
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaStar className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <MdOutlinePostAdd className="text-[#3385FF]" /> Rate : 4.2
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <PiNotebookBold className="text-[#3385FF]" /> Rate : 4.2
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 shrink-0">
        <Link
          href="/dashboard/edit_profile"
          className="flex items-center justify-center gap-2 text-[#3385FF] text-xs py-2.5 px-4 border rounded-[12px] whitespace-nowrap"
        >
          <FaUserEdit />
          Edit Profile
        </Link>
        <Link
          href="/reporter/create-post"
          className="flex items-center justify-center gap-2 text-white bg-[#3385FF] text-xs py-2.5 px-4 border rounded-[12px] whitespace-nowrap"
        >
          <FaPlus />
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
