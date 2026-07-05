import Link from "next/link";
import React from "react";
import {
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const StayConnet = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Stay Connected</h2>
        </div>
      </div>

      <div className="flex gap-3 items-center w-full mt-2">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 mt-2">
        <div className="bg-[#4281FF] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaFacebookF className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
        <div className="bg-[#FF41C6] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaInstagram className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
        <div className="bg-[#EF5043] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaYoutube className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
        <div className="bg-[#42C0F5] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaTwitter className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
        <div className="bg-[#1B7BFD] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaBehance className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
        <div className="bg-[#F7679D] flex items-center gap-4 p-2 text-white rounded-xl">
          <FaDribbble className="h-4" />
          <div>
            <p className="text-xs">15, 000</p>
            <p className="text-xs">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayConnet;
