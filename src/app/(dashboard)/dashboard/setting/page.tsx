"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaArrowLeft, FaCamera, FaPen, FaPlus } from "react-icons/fa6";

import PageTitle from "../../components/page-Title";
import { useAdminProfile } from "@/hooks/useAdminProfile";
import { updateAdminInfo } from "@/services/adminUser/admin.user";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { TAdmin } from "@/types/admin.type";

const TitleDetails = {
  title: "Website Configuration",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Website Configuration" },
  ],
};

type TAdminForm = {
  adminName: string;
  email: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const Page = () => {
  const { adminData, adminId, mutate } = useAdminProfile();
  const token = getFromLocalStorage(authkey);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TAdminForm>({
    defaultValues: { adminName: "", email: "" },
  });

  // data এলে (বা mutate-এর পর বদলালে) form ভরে দাও
  useEffect(() => {
    if (adminData) {
      reset({
        adminName: adminData.adminName ?? "",
        email: adminData.email ?? "",
      });
    }
  }, [adminData, reset]);

  const clearImageState = () => {
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setUploadError(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File size must be less than 10 MB");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    try {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "https://gen-voice-backend.onrender.com/api/v1/upload/upload_file",
        { method: "POST", body: formData },
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Upload failed");

      setUploadedImageUrl(result.data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async ({ adminName }: TAdminForm) => {
    const updatePayload: Partial<TAdmin> = {
      ...(adminName.trim() ? { adminName } : {}),
      profileImage: uploadedImageUrl ?? adminData?.profileImage ?? undefined,
    };

    try {
      const response = await updateAdminInfo(
        adminId as string,
        token as string,
        updatePayload,
      );

      if (response.success) {
        await mutate(); // navbar + এই page দুটোই আপডেট হবে
        clearImageState(); // এখন server-এর নতুন ছবি দেখাবে
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your Information update successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "failed",
        text: "Your information failed to update",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleReset = () => {
    reset({
      adminName: adminData?.adminName ?? "",
      email: adminData?.email ?? "",
    });
    clearImageState();
  };

  const displayImage = previewUrl ?? adminData?.profileImage;

  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5 mt-5 lg:mt-0">
          <Link
            href="/dashboard"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>
      </div>

      <div className="mt-10 border rounded-2xl p-5">
        <label
          htmlFor="profileImage"
          className="relative cursor-pointer w-fit block group"
        >
          {displayImage ? (
            <Image
              src={displayImage}
              alt="user image"
              width={100}
              height={100}
              className="rounded-full object-cover w-[100px] h-[100px]"
              unoptimized
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <FaCamera className="text-gray-400" size={28} />
            </div>
          )}

          <span className="absolute bottom-0 right-0 bg-[#005CE8] text-white rounded-full p-2 border-2 border-white flex items-center justify-center">
            <FaPen size={12} />
          </span>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {isUploading && (
          <p className="text-xs text-gray-500 mt-1">Uploading...</p>
        )}
        {uploadError && (
          <p className="text-xs text-red-500 mt-1">{uploadError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Write here..."
              {...register("adminName")}
              className="border border-gray-200 p-3 rounded-lg outline-0 focus:border-[#005CE8] placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-5">
            <label htmlFor="role" className="text-sm text-gray-700">
              Role
            </label>
            <input
              id="role"
              type="text"
              value={adminData?.role ?? ""}
              readOnly
              placeholder="Write here..."
              className="border border-gray-200 p-3 rounded-lg outline-0 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-5">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Write here..."
              {...register("email")}
              className="border border-gray-200 p-3 rounded-lg outline-0 focus:border-[#005CE8] placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 border border-red-300 text-red-500 rounded-lg py-3 font-medium hover:bg-red-50 transition"
            >
              <span className="bg-red-500 text-white rounded p-1 flex items-center justify-center">
                <FaPlus size={10} />
              </span>
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex items-center justify-center gap-2 bg-[#005CE8] text-white rounded-lg py-3 font-medium hover:bg-[#0049ba] transition disabled:opacity-60"
            >
              <span className="bg-white/20 rounded p-1 flex items-center justify-center">
                <FaPlus size={10} />
              </span>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
