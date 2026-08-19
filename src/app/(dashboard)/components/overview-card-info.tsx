
import { FaCheckToSlot, FaUser } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { LuBoxes, LuUsers } from "react-icons/lu";
import { FiArrowDownRight } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { IoTrashBinSharp } from "react-icons/io5";

const OverviewCard = () => {
  return (
    <div>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Total Active Users
            </h3>
            <LuUsers className="bg-[#D2FFDB] text-[#00BC26] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">5.1K</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +4.7K
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Pending Users
            </h3>
            <LuUsers className="bg-[#FBF2DB] text-[#FF7300] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">40</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +10
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Blocked Users
            </h3>
            <LuUsers className="bg-[#FFCACA] text-[#FF0000] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">20</p>
          <p className="flex items-center text-[#FF0000]">
            <FiArrowDownRight />
            -8
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Total Users
            </h3>
            <LuUsers className="bg-[#DBE5FB] text-[#447DFD] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">5.1K</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +5.3K
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Published News
            </h3>
            <GiNotebook className="bg-[#D2FFDB] text-[#00BC26] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">5.1K</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +16.7K
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Pending News
            </h3>
            <GiNotebook className="bg-[#FBF2DB] text-[#FF7300] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">40</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +10
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Reject News
            </h3>
            <GiNotebook className="bg-[#FFCACA] text-[#FF0000] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">20</p>
          <p className="flex items-center text-[#FF0000]">
            <FiArrowDownRight />
            -8
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Archived News
            </h3>
            <IoTrashBinSharp className="bg-[#D2FFDB] text-[#00BC26] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">160</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +4
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Polls
            </h3>
            <FaCheckToSlot className="bg-[#FED5FF] text-[#FB00FF] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">100</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +14
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Total Active Users
            </h3>
            <LuBoxes className="bg-[#CAEFFF] text-[#01ADF6] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">5.1K</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +4.7K
          </p>
        </div>
        <div className="border rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-[#4F4F4F] mb-2.5 text-sm font-semibold">
              Total Visitors
            </h3>
            <LuUsers className="bg-[#D2FFDB] text-[#00BC26] text-3xl p-1 rounded-md" />
          </div>
          <p className="text-2xl mb-1.5 font-semibold">400.1K</p>
          <p className="flex items-center text-[#00BC26]">
            <MdArrowOutward />
            +20%
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
