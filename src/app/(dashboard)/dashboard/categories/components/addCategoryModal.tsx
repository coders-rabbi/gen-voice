"use client";

import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { createNewsCategory } from "@/services/category";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { TCreateCategoryPayload } from "@/types/category";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type FormValues = {
  categoryName: string;
  slug: string;
  description: string;
  isFeatured: boolean;
};

const defaultValues: FormValues = {
  categoryName: "",
  slug: "",
  description: "",
  isFeatured: false,
};

const AddCategoryModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues });

  const token = getFromLocalStorage(authkey);
  const isFeatured = watch("isFeatured");

  if (!isOpen) return null;

  const handleCancel = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    const payload: TCreateCategoryPayload = {
      categoryName: data.categoryName,
      slug: data.slug,
      description: data.description,
      isFeatured: data.isFeatured,
    };

    try {
      await createNewsCategory(token as string, payload);

      Swal.fire({
        icon: "success",
        title: "Added",
        text: `"${data.categoryName}"Category successfully created.`,
        timer: 2000,
        showConfirmButton: false,
      });

      onSuccess?.();
      reset(defaultValues);
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Category তৈরি করা যায়নি। আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 md:px-0">
      <div className="bg-white rounded-2xl w-4xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Add Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Write here...."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                {...register("categoryName", {
                  required: "Category name is required",
                })}
              />
              {errors.categoryName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.categoryName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                placeholder="Write here...."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                {...register("slug", { required: "Slug is required" })}
              />
              {errors.slug && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">
              Category Description
            </label>
            <textarea
              placeholder="Write here...."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Featured Category Toggle */}
          <div className="flex items-center justify-between mb-6 border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-700 font-medium">
              Featured Category
            </span>
            <button
              type="button"
              onClick={() => setValue("isFeatured", !isFeatured)}
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
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
