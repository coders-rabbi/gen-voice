import React from "react";
import { GoDotFill } from "react-icons/go";

const SideCategory = () => {
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

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#F65050]" />
            <p>Life Style</p>
          </div>
          <p className="bg-[#F65050] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#A56CBD]" />
            <p>World</p>
          </div>
          <p className="bg-[#A56CBD] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#49CFE8]" />
            <p>Calture</p>
          </div>
          <p className="bg-[#49CFE8] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#C23785]" />
            <p>Food</p>
          </div>
          <p className="bg-[#C23785] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#4C60F5]" />
            <p>Technology</p>
          </div>
          <p className="bg-[#4C60F5] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#0088FF]" />
            <p>Sports</p>
          </div>
          <p className="bg-[#0088FF] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#F7679D]" />
            <p>Football</p>
          </div>
          <p className="bg-[#F7679D] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#42C0F5]" />
            <p>Cricket</p>
          </div>
          <p className="bg-[#42C0F5] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GoDotFill className="text-[#FFBE05]" />
            <p>Business</p>
          </div>
          <p className="bg-[#FFBE05] p-1.5 rounded-[6px] text-white w-fit">
            50
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideCategory;
