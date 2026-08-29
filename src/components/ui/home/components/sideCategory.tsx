import { getAllNewsCategories } from "@/services/category";
import React from "react";
import { GoDotFill } from "react-icons/go";

const SideCategory = async () => {
  const cateogries = await getAllNewsCategories();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2  mt-4">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232]">Category</h2>
        </div>
      </div>

      <div className="flex gap-3 items-center w-full mt-2">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {cateogries.slice(0, 9).map((item) => (
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <GoDotFill className="text-[#F65050]" />
              <p>{item?.categoryName}</p>
            </div>
            <p className="bg-[#F65050] p-1.5 rounded-[6px] text-white w-fit">
              50
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideCategory;
