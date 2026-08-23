"use client";

import { useState } from "react";
import { TCategory } from "@/types/category";

type Props = {
  categories: TCategory[];
};

const NewsFilter = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex justify-between items-center p-2.5">
      <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2 border rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users, posts, polls....."
          className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="relative w-fit">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none px-4 py-2 pr-9 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white cursor-pointer outline-none"
        >
          <option value="all">All Category</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewsFilter;
