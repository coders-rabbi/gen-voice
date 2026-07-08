import React from "react";
import { CiCalendar } from "react-icons/ci";

const BusinessSideCart = () => {
  return (
    <div className="border-b pb-1.5 mt-1.5">
      <p className="text-xs text-[#6D757F] font-semibold">AUDIT</p>
      <h4 className="text-[16px] text-[#183354] font-bold mt-1">
        Take a Look Back at the Moseret Gala Red Carpet Ever
      </h4>
      <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold mt-2">
        <CiCalendar /> 27 Jun, 2026
      </p>
    </div>
  );
};

export default BusinessSideCart;
