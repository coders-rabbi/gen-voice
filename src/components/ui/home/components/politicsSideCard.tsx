import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import basket from "@/assets/home/basket.jpg";
import football from "@/assets/home/football.jpg";
import boxing from "@/assets/home/boxing.jpg";
import Image from "next/image";

const PoliticsSideCard = () => {
  return (
    <div className="flex gap-0.5 border-b pb-1.5">
      <Link href="/">
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold">BASKET BALL</h5>
          <h3 className="text-sm text-[#183354] font-semibold">
            Using Instagram tawo promote your
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold text-xs mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>
      </Link>
      <Image src={basket} alt="gen voice" className="w-24 h-24 object-cover" />
    </div>
  );
};

export default PoliticsSideCard;
