"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { HiOutlinePhotograph } from "react-icons/hi";
import Swal from "sweetalert2";
import { TCategory } from "@/types/category";
import { updateNewsCategory } from "@/services/category";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  category: TCategory | null;
};

const MAX_FILE_SIZE_MB = 10;

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
  const token = getFromLocalStorage(authkey);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImagePublicId, setUploadedImagePublicId] =
    useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName ?? "");
      setIsFeatured(category.isFeatured ?? false);

      if (category.image) {
        // existing image দিয়ে preview populate করা হচ্ছে
        setPreviewUrl(category.image);
        setUploadedImageUrl(category.image);
      } else {
        setPreviewUrl(null);
        setUploadedImageUrl(null);
        setUploadedImagePublicId("");
      }
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const resetForm = () => {
    setCategoryName("");
    setIsFeatured(false);
    setError(null);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setUploadedImagePublicId("");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadFile = async (file: File) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadError(`File size must be less than ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // preview immediately dekhiye dei
    setPreviewUrl(URL.createObjectURL(file));

    try {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "https://gen-voice-backend.onrender.com/api/v1/upload/upload_file",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setUploadedImageUrl(result.data.url);
      setUploadedImagePublicId(result.data.publicId);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setPreviewUrl(category?.image ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemoveImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setUploadedImagePublicId("");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      categoryName,
      isFeatured,
      image: uploadedImageUrl,
    };

    try {
      const result = await updateNewsCategory(
        token as string,
        category._id,
        payload,
      );

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
      <div className="bg-white rounded-2xl w-4xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
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
          {/* Image Upload */}
          <div className="mb-5">
            <div
              onClick={() =>
                !previewUrl && !isUploading && fileInputRef.current?.click()
              }
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-10 px-4 transition-colors ${
                previewUrl ? "" : "cursor-pointer"
              } ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {previewUrl ? (
                <div className="relative w-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={previewUrl}
                      alt="Category preview"
                      fill
                      className="rounded-xl object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                        <span className="text-sm text-white">Uploading...</span>
                      </div>
                    )}
                  </div>
                  {!isUploading && (
                    <div className="mt-3 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm text-[#005CE8] hover:underline"
                      >
                        Change image
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005CE8]">
                    <HiOutlinePhotograph size={20} className="text-white" />
                  </span>
                  <p className="text-sm font-medium text-[#005CE8]">
                    Upload Category Image
                  </p>
                  <p className="text-center text-xs text-gray-400">
                    Drag & Drop or Choose file
                    <br />
                    To upload media MAX {MAX_FILE_SIZE_MB} MB.
                  </p>
                </>
              )}
            </div>
            {uploadError && (
              <p className="text-sm text-red-500 mt-1">{uploadError}</p>
            )}
          </div>

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
              disabled={isSubmitting || isUploading}
              className="flex-1 border border-gray-200 rounded-xl py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
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
