import Image from "next/image";
import reporterImage from "@/assets/home/man.jpg";
import { FaEye, FaPlus, FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";
import { TReporter } from "@/types/reporter";

interface reporterProps {
  reporter: TReporter;
}

const ReporterCard = ({ reporter }: reporterProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 border p-1.5 w-full rounded-[12px]">
        <Image
          src={reporterImage}
          alt="gen voice"
          width={100}
          height={100}
          className="h-20 w-20 object-cover"
        />
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <h3>{reporter?.fullName}</h3>
            <p className="text-[#3E3232BF]">28 news</p>
          </div>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex gap-1 items-center border py-1 px-2 rounded-xl text-[10px]"
            >
              <FaPlus />
              Follow
            </Link>

            <Link
              href={`/reporters/${reporter?.id}`}
              className="flex gap-1 items-center border-2 py-1 px-2 rounded-xl bg-[#3385FF] text-white text-[10px]"
            >
              <FaEye />
              View Profile
            </Link>

            <FaRegBookmark className="text-[16px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporterCard;
