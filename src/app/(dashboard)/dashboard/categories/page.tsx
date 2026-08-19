"use client";

import Link from "next/link";
import { useState } from "react";
import PageTitle from "../../components/page-Title";
import CategoriesCard from "./components/categoriesCard";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import AddCategoryModal from "./components/addCategoryModal";

const TitleDetails = {
  title: "Categories",
  subtitle: "Create nested categories, feature them and manage SEO metadata.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Categories" }],
};

export type TCategory = {
  id: number;
  title: string;
  featured: boolean;
  posts: number;
};

const Categories: TCategory[] = [
  { id: 1, title: "Technology", featured: true, posts: 18 },
  { id: 2, title: "Business", featured: true, posts: 18 },
  { id: 3, title: "Politics", featured: false, posts: 18 },
  { id: 4, title: "Music", featured: false, posts: 18 },
  { id: 5, title: "Featured", featured: false, posts: 18 },
  { id: 6, title: "Fashion", featured: false, posts: 18 },
  { id: 7, title: "Food", featured: false, posts: 11 },
  { id: 8, title: "Travel", featured: false, posts: 18 },
  { id: 9, title: "Animal", featured: false, posts: 30 },
  { id: 10, title: "Car", featured: false, posts: 11 },
  { id: 11, title: "Abstract", featured: false, posts: 18 },
  { id: 12, title: "Healthy Living", featured: false, posts: 11 },
  { id: 13, title: "Featured", featured: false, posts: 18 },
  { id: 14, title: "Fashion", featured: false, posts: 18 },
  { id: 15, title: "Food", featured: false, posts: 11 },
  { id: 16, title: "Travel", featured: false, posts: 18 },
];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-2.5">
          <Link
            href="/dashboard"
            className="bg-[#F0F6FF] text-[#005CE8] border px-5 py-1.5 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#005CE8] text-white border px-5 py-1.5 flex items-center gap-2 rounded-2xl border-[#F0F6FF] w-fit "
          >
            <FaPlus />
            Add Categories
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {Categories.map((item) => (
          <CategoriesCard key={item.id} item={item} />
        ))}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Page;
