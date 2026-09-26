"use client";
import Image from "next/image";
import defaultUser from "@/assets/dashboard/user.jpg"
import { FaPlus, FaStar, FaUser, FaArrowLeft } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface newsProps {
  extraDetails: any;
}

const ProfileInfo = ({ extraDetails }: newsProps) => {
  const { pendingNews, publishedNews, reporterData, count, rating, follwingCount } =
    extraDetails;

  const pathname = usePathname();
  const isProfileHome = pathname === "/reporter";

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2.5 px-4">
      {/* Image + Name */}
      <div className="flex gap-2.5 items-center shrink-0">
        <Image
          src={reporterData?.profileImage || defaultUser}
          alt="gen voice"
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-[12px]"
          width={100}
          height={100}
          unoptimized
        />
        <h2 className="text-sm md:text-[16px] font-medium">
          {reporterData?.data?.fullName}
        </h2>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-x-10">
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaStar className="text-[#3385FF]" /> Rate : {rating | 0}
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Follower : {count | 0}
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <FaUser className="text-[#3385FF]" /> Following : {follwingCount | 0}
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <MdOutlinePostAdd className="text-[#3385FF]" /> News :{" "}
          {publishedNews.length}
        </p>
        <p className="flex items-center gap-2 text-sm text-[#3E3232BF]">
          <PiNotebookBold className="text-[#3385FF]" /> Pending news :{" "}
          {pendingNews.length}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {isProfileHome ? (
          <>
            <Link
              href="/reporter/edit_profile"
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
          </>
        ) : (
          <Link
            href="/reporter"
            className="flex items-center justify-center gap-2 text-[#3385FF] text-xs py-2.5 px-4 border rounded-[12px] whitespace-nowrap"
          >
            <FaArrowLeft />
            Back To Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
