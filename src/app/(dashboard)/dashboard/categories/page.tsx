"use client";

import Link from "next/link";
import { useState } from "react";
import PageTitle from "../../components/page-Title";
import CategoriesCard from "./components/categoriesCard";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import AddCategoryModal from "./components/addCategoryModal";
import { getAllNewsCategories } from "@/services/category";
import { TCategory } from "@/types/category";
import useSWR from "swr";
import CategoriesCardSkeleton from "./components/CategoriesCardSkeleton";

const TitleDetails = {
  title: "Categories",
  subtitle: "Create nested categories, feature them and manage SEO metadata.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Categories" }],
};

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<TCategory[]>(
    "all-categories",
    getAllNewsCategories,
  );


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
        {isLoading ? (
          <CategoriesCardSkeleton />
        ) : error ? (
          <p className="col-span-full text-center text-red-500 py-6">
            Failed to load categories.
          </p>
        ) : data?.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 py-6">
            No categories found.
          </p>
        ) : (
          data?.map((item) => (
            <CategoriesCard key={item._id} item={item} onUpdated={mutate} />
          ))
        )}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={mutate}
      />
    </div>
  );
};

export default Page;
