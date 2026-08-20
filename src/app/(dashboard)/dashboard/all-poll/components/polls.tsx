import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { FaCopy, FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

const Polls = () => {
  return (
    <div className="bg-[#F3FFF7] border rounded-md p-5">
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-[#414141]">
          Survey on public attitudes toward AI regulation and oversight.
        </p>
        <p className="text-[10px] text-[#009738] border border-[#009738] px-2 py-1 rounded-2xl flex items-center gap-1">
          <GoDotFill />
          active
        </p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p className="text-[#71717B] flex items-center gap-2">
          <FiUsers className=" text-[#71717B]" />
          2,341 Total Votes
        </p>
        <div className="flex gap-5 text-[#71717B]">
          <p className="flex gap-2 items-center">
            <CiCalendar />
            Agu 2
          </p>
          <p className="flex gap-2 items-center">
            <CiCalendar />
            Agu 21
          </p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Link
          href="all-poll/poll-details"
          className="border rounded-md flex items-center gap-2 justify-center py-1 w-full"
        >
          <FaEye />
          Details
        </Link>
        <div className="flex gap-2">
          <FaPencil className="border p-1 text-3xl rounded-md px-2" />
          <FaCopy className="border p-1 text-3xl rounded-md px-2" />
          <FaTrash className="border p-1 text-3xl rounded-md px-2 text-[#EC003F]" />
        </div>
      </div>
    </div>
  );
};

export default Polls;
