import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import vote from "@/assets/home/vote.png";

const VoteOpinion = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-[14px] font-semibold text-[#3E3232] ">Vote Your Opinion</h2>
        </div>

        <Link
          href="/"
          className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
        >
          View All
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="card py-4 px-1.5 shadow-sm mt-2 border rounded-xl">
          <div className="flex items-center gap-2">
            <Image src={vote} alt="gen voice" className="w-14 h-14" />
            <div>
              <div className="flex justify-between items-center ">
                <h4 className="text-[#6D757F] font-semibold text-sm">
                  CALTURE
                </h4>
                <p className="flex items-center gap-1 text-[16px] text-[#6D757F] font-semibold">
                  <CiCalendar /> 27 Jun, 2026
                </p>
              </div>
              <p className="text-xs font-semibold text-[#183354] mt-1">
                How To Protect Your App With Threat Model Based On To Protect
                Your App With?
              </p>
            </div>
          </div>

          <form className="space-y-4 pl-4">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="agree"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Agree
              </span>
            </label>

            {/* Disagree Option */}
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="disagree"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Disagree
              </span>
            </label>

            {/* Maybe Option */}
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="maybe"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Maybe
              </span>
            </label>

            {/* Custom Write Option */}
            <div className="flex items-center gap-4 pt-1">
              <input
                type="radio"
                name="poll"
                value="custom"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <input
                type="text"
                placeholder="Write Here..."
                className="w-full max-w-[320px] px-4 py-3 bg-[#EAF3FF] text-gray-700 placeholder-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 text-[10px] font-medium"
              />
            </div>

            {/* Optional Submit Button */}
            {/* <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-[10px]"
              >
                Submit Vote
              </button>
            </div> */}
          </form>
        </div>
        <div className="card py-4 px-1.5 shadow-sm border rounded-xl">
          <div className="flex items-center gap-2">
            <Image src={vote} alt="gen voice" className="w-14 h-14" />
            <div>
              <div className="flex justify-between items-center ">
                <h4 className="text-[#6D757F] font-semibold text-sm">
                  CALTURE
                </h4>
                <p className="flex items-center gap-1 text-[16px] text-[#6D757F] font-semibold">
                  <CiCalendar /> 27 Jun, 2026
                </p>
              </div>
              <p className="text-xs font-semibold text-[#183354] mt-1">
                How To Protect Your App With Threat Model Based On To Protect
                Your App With?
              </p>
            </div>
          </div>

          <form className="space-y-4 pl-4">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="agree"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Agree
              </span>
            </label>

            {/* Disagree Option */}
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="disagree"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Disagree
              </span>
            </label>

            {/* Maybe Option */}
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="radio"
                name="poll"
                value="maybe"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                Maybe
              </span>
            </label>

            {/* Custom Write Option */}
            <div className="flex items-center gap-4 pt-1">
              <input
                type="radio"
                name="poll"
                value="custom"
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />
              <input
                type="text"
                placeholder="Write Here..."
                className="w-full max-w-[320px] px-4 py-3 bg-[#EAF3FF] text-gray-700 placeholder-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 text-[10px] font-medium"
              />
            </div>

            {/* Optional Submit Button */}
            {/* <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-[10px]"
              >
                Submit Vote
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoteOpinion;
