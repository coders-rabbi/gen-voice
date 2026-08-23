"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { TCategory } from "@/types/category";
import { updateNewsCategory } from "@/services/category";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category: TCategory | null;
};

const UpdateCategoryModal = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}: Props) => {
  const [categoryName, setCategoryName] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName ?? "");
      setIsFeatured(category.isFeatured ?? false);
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const resetForm = () => {
    setCategoryName("");
    setIsFeatured(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      categoryName,
      isFeatured,
    };

    try {
      const result = await updateNewsCategory(category._id, payload);
      console.log("Update success:", result);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: result.message,
        timer: 2000,
        showConfirmButton: false,
      });

      onSuccess?.();
      resetForm();
      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Category আপডেট করা যায়নি।";

      setError(message);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 md:px-0">
      <div className="bg-white rounded-2xl w-4xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Update Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Write here...."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6 border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-700 font-medium">
              Featured Category
            </span>
            <button
              type="button"
              onClick={() => setIsFeatured((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isFeatured ? "bg-[#005CE8]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isFeatured ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 border border-gray-200 rounded-xl py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#005CE8] text-white rounded-xl py-3 font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
