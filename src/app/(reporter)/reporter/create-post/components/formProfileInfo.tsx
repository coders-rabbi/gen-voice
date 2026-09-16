import manImage from "@/assets/home/man2.jpg";
import Image from "next/image";
import { FaArrowLeft, FaPlus, FaStar, FaUser } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";
import { TReporter } from "@/types/reporter";

interface reporterProprs {
  reporter: TReporter;
}

const FormProfileInfo = ({ reporter }: reporterProprs) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2.5 px-4">
      {/* Image + Name */}
      <div className="flex gap-2.5 items-center shrink-0">
        <Image
          src={manImage}
          alt="gen voice"
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-[12px]"
        />
        <h2 className="text-sm md:text-[16px] font-medium">{reporter?.fullName}</h2>
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
      <Link
        href="/reporter"
        className="flex items-center justify-center gap-2 text-[#3385FF] text-xs py-2.5 px-4 border rounded-[12px] whitespace-nowrap"
      >
        <FaArrowLeft />
        Back To Profile
      </Link>
    </div>
  );
};

export default FormProfileInfo;
