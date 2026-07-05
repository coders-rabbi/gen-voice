import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

import basket from "@/assets/home/basket.jpg";
import football from "@/assets/home/football.jpg";
import boxing from "@/assets/home/boxing.jpg";

const CaltureSideBar = () => {
  return (
    <div className="mt-4">
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
        <div className="md:flex gap-0.5 mb-2">
          <Link href="/">
            <div>
              <h5 className="text-[#6D757F] text-xs font-semibold">
                BASKET BALL
              </h5>
              <h3 className="text-[16px] text-[#183354] font-semibold">
                Using Instagram tawo promote your
              </h3>
              <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
                <CiCalendar /> 27 Jun, 2026
              </p>
            </div>
          </Link>
          <Image
            src={basket}
            alt="gen voice"
            className="w-24 h-24 object-cover"
          />
        </div>
        <div className="md:flex gap-0.5 mb-2">
          <Link href="/">
            <div>
              <h5 className="text-[#6D757F] text-xs font-semibold">
                BASKET BALL
              </h5>
              <h3 className="text-[16px] text-[#183354] font-semibold">
                Using Instagram tawo promote your
              </h3>
              <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
                <CiCalendar /> 27 Jun, 2026
              </p>
            </div>
          </Link>
          <Image
            src={boxing}
            alt="gen voice"
            className="w-24 h-24 object-cover"
          />
        </div>
        {/* <div className="md:flex gap-0.5 mb-2">
          <Link href="/">
            <div>
              <h5 className="text-[#6D757F] text-xs font-semibold">
                BASKET BALL
              </h5>
              <h3 className="text-[16px] text-[#183354] font-semibold">
                Using Instagram tawo promote your
              </h3>
              <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
                <CiCalendar /> 27 Jun, 2026
              </p>
            </div>
          </Link>
          <Image
            src={football}
            alt="gen voice"
            className="w-24 h-24 object-cover"
          />
        </div>
        <div className="md:flex gap-0.5">
          <Link href="/">
            <div>
              <h5 className="text-[#6D757F] text-xs font-semibold">
                BASKET BALL
              </h5>
              <h3 className="text-[16px] text-[#183354] font-semibold">
                Using Instagram tawo promote your
              </h3>
              <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
                <CiCalendar /> 27 Jun, 2026
              </p>
            </div>
          </Link>
          <Image
            src={basket}
            alt="gen voice"
            className="w-24 h-24 object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default CaltureSideBar;
