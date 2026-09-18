"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ImagePlus, RotateCcw, Save, Loader2 } from "lucide-react";
import PageTitle from "@/app/(dashboard)/components/page-Title";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { createWebAboutInfo, getWebAboutInfo } from "@/services/web-about-info";
import Swal from "sweetalert2";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

import useSWR from "swr";

type AboutFormValues = {
  heading: string;
  description: string;
};

const TitleDetails = {
  title: "About Us",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Web-Config", href: "/dashboard/web-config" },
    {
      label: "About Us",
    },
  ],
};

const page = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImagePublicId, setUploadedImagePublicId] = useState<
    string | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const token = getFromLocalStorage(authkey);
  const { data: webAboutInfo, mutate } = useSWR(
    token ? ["webAboutInfo", token] : null,
    () => getWebAboutInfo(),
  );

  useEffect(() => {
    if (webAboutInfo?.data) {
      reset({
        heading: webAboutInfo.data.heading ?? "",
        description: webAboutInfo.data.description ?? "",
      });
      if (webAboutInfo.data.image) {
        setPreviewUrl(webAboutInfo.data.image);
      }
    }
  }, [webAboutInfo]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AboutFormValues>({
    defaultValues: {
      heading: "",
      description: "",
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10 MB");
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
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    reset();
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setUploadedImagePublicId(null);
    setUploadError(null);
  };

  const onSubmit: SubmitHandler<AboutFormValues> = async (data) => {
    if (!uploadedImageUrl || !uploadedImagePublicId) {
      setUploadError("Please upload an image first");
      return;
    }

    const imageUrl: string = uploadedImageUrl;
    const imagePublicId: string = uploadedImagePublicId;

    try {
      const payload = {
        ...data,
        image: imageUrl,
        imagePublicId: imagePublicId,
      };

      const res = await createWebAboutInfo(payload);
      if (!res.success) {
        throw new Error(res?.message || "Something went wrong");
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Added",
          text: `"About Info successfully created.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "About info can't create",
      });
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle TitleDetails={TitleDetails} />
        <Link
          href="/dashboard/web-config"
          className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
        {/* Image Upload */}
        <label
          htmlFor="hero-image"
          className="relative flex h-64 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              {/* Overlay - hover korle change korার option dekhabe */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white">
                  Click to change image
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <ImagePlus className="h-5 w-5 text-white" />
              </div>

              <p className="text-sm font-medium text-blue-600">
                Upload Image for Hero Section
              </p>
              <p className="text-xs text-gray-400">
                Drag &amp; Drop or Choose file
                <br />
                To upload media MAX 10 MB.
              </p>
            </>
          )}

          <input
            id="hero-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </label>
        {uploadError && (
          <p className="mt-2 text-xs text-red-500">{uploadError}</p>
        )}

        {/* Heading */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Heading
          </label>
          <input
            type="text"
            placeholder="Write here..."
            {...register("heading", { required: "Heading is required" })}
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.heading && (
            <p className="mt-1 text-xs text-red-500">
              {errors.heading.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <RichTextEditor
                label="Description"
                placeholder="Write your description..."
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-red-300 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
