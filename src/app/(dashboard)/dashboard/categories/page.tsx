"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../../components/page-Title";
import CategoriesCard from "./components/categoriesCard";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import AddCategoryModal from "./components/addCategoryModal";
import { getAllNewsCategories } from "@/services/category";
import { TCategory } from "@/types/category";
import UpdateCategoryModal from "./components/updateCategoryModal";

const TitleDetails = {
  title: "Categories",
  subtitle: "Create nested categories, feature them and manage SEO metadata.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Categories" }],
};

export type TCategry = {
  id: number;
  title: string;
  featured: boolean;
  posts: number;
};

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllNewsCategories();
      setCategories(data ?? []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      {/* <p>Test: {categories.length}</p> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {categories.map((item) => (
          <CategoriesCard key={item._id} item={item} onUpdated={fetchData} />
        ))}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData} // ✅
      />
    </div>
  );
};

export default Page;
