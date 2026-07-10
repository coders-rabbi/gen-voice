import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

import basket from "@/assets/home/basket.jpg";
import football from "@/assets/home/football.jpg";
import boxing from "@/assets/home/boxing.jpg";
import PoliticsSideCard from "./politicsSideCard";
import { getAllBlog } from "@/services/postService";

const CaltureSideBar = async () => {
  const posts = await getAllBlog();
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mt-4">
        {posts.slice(0, 4).map((item) => (
          <PoliticsSideCard key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default CaltureSideBar;
