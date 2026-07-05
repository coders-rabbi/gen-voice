import Link from "next/link";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import businessMan from "@/assets/home/businessman.jpg";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import sideBarImage from "@/assets/home/sidebarimage.jpg";

const BusinessSideBar = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-[14px] font-semibold text-[#3E3232] ">Calture</h2>
        </div>

        <Link
          href="/"
          className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
        >
          View All
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2.5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="mt-4">
        <Image src={businessMan} alt="gen voice" className="h-[210px] w-full" />
        <div>
          <p className="text-xs text-[#6D757F] font-semibold mt-5">AUDIT</p>
          <h4 className="text-[16px] text-[#183354] font-bold mt-1">
            Take a Look Back at the Moseret Gala Red Carpet Ever
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>

        <hr className="text-[#DFDFDF] my-5" />

        <div>
          <p className="text-xs text-[#6D757F] font-semibold mt-5">AUDIT</p>
          <h4 className="text-[16px] text-[#183354] font-bold mt-1">
            Take a Look Back at the Moseret Gala Red Carpet Ever
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>

        <hr className="text-[#DFDFDF] my-5" />

        <div>
          <p className="text-xs text-[#6D757F] font-semibold mt-5">AUDIT</p>
          <h4 className="text-[16px] text-[#183354] font-bold mt-1">
            Take a Look Back at the Moseret Gala Red Carpet Ever
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>

        <hr className="text-[#DFDFDF] my-5" />

        <div>
          <p className="text-xs text-[#6D757F] font-semibold mt-5">AUDIT</p>
          <h4 className="text-[16px] text-[#183354] font-bold mt-1">
            Take a Look Back at the Moseret Gala Red Carpet Ever
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>

        <hr className="text-[#DFDFDF] my-5" />

        <div>
          <p className="text-xs text-[#6D757F] font-semibold mt-5">AUDIT</p>
          <h4 className="text-[16px] text-[#183354] font-bold mt-1">
            Take a Look Back at the Moseret Gala Red Carpet Ever
          </h4>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>

        {/* side bar Image */}
        <div className="mt-3">
          <Image
            src={sideBarImage}
            alt="gen voice"
            className="h-[210px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessSideBar;
