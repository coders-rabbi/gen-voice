"use client";

import PageTitle from "@/app/(dashboard)/components/page-Title";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ImagePlus, RotateCcw, Save, Loader2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import RichTextEditor from "@/components/RichTextEditor";
import Swal from "sweetalert2";
import useSWR from "swr";
import {
  createSiteContact,
  getSiteContact,
  updateSiteContact,
} from "@/services/web-contact-info";
import { getFromLocalStorage } from "../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

const TitleDetails = {
  title: "Contact Info",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Web-Config", href: "/dashboard/web-config" },
    {
      label: "Contact Info",
    },
  ],
};

type ContactInfoFormValues = {
  mapLink: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  shortDescription: string;
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
  const { data: siteContact, mutate } = useSWR(
    token ? ["siteContact", token] : null,
    () => getSiteContact(),
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactInfoFormValues>({
    defaultValues: {
      mapLink: "",
      email: "",
      phone: "",
      fax: "",
      address: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      shortDescription: "",
    },
  });

  useEffect(() => {
    if (siteContact?.data) {
      reset({
        mapLink: siteContact.data.mapLink ?? "",
        email: siteContact.data.email ?? "",
        phone: siteContact.data.phone ?? "",
        fax: siteContact.data.fax ?? "",
        address: siteContact.data.address ?? "",
        facebook: siteContact.data.facebook ?? "",
        instagram: siteContact.data.instagram ?? "",
        twitter: siteContact.data.twitter ?? "",
        youtube: siteContact.data.youtube ?? "",
        shortDescription: siteContact.data.shortDescription ?? "",
      });
      if (siteContact.data.logo) {
        setPreviewUrl(siteContact.data.logo);
        setUploadedImageUrl(siteContact.data.logo);
      }
    }
  }, [siteContact]);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit: SubmitHandler<ContactInfoFormValues> = async (data) => {
    if (!uploadedImageUrl) {
      setUploadError("Please upload a logo first");
      return;
    }

    try {
      const payload = {
        ...data,
        logo: uploadedImageUrl,
        logoPublicId: uploadedImagePublicId ?? undefined,
      };

      const isUpdate = !!siteContact?.data;

      const res = isUpdate
        ? await updateSiteContact(payload)
        : await createSiteContact(payload);

      if (!res.success) {
        throw new Error(res?.message || "Something went wrong");
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Saved",
          text: `Contact Info successfully ${isUpdate ? "updated" : "created"}.`,
          timer: 2000,
          showConfirmButton: false,
        });
        mutate();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Contact Info can't be saved",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle TitleDetails={TitleDetails} />
        <Link
          href="/dashboard/web-config"
          className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Map Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Map Link
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("mapLink", { required: "Map Link is required" })}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.mapLink && (
              <p className="mt-1 text-xs text-red-500">
                {errors.mapLink.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Write here..."
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Phone
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("phone", { required: "Phone is required" })}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Fax */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Fax
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("fax")}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Address
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("address", { required: "Address is required" })}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Facebook */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Facebook
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("facebook")}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Instagram
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("instagram")}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Twitter
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("twitter")}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              YouTube
            </label>
            <input
              type="text"
              placeholder="Write here..."
              {...register("youtube")}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <label
          htmlFor="footer-logo"
          className="relative mt-8 flex h-52 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors"
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white">
                  Click to change logo
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <ImagePlus className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-medium text-blue-600">
                Upload Logo for Footer
              </p>
              <p className="text-xs text-gray-400">
                Drag &amp; Drop or Choose file
                <br />
                To upload media MAX 10 MB.
              </p>
            </>
          )}

          <input
            id="footer-logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
            disabled={isUploading}
          />
        </label>
        {uploadError && (
          <p className="mt-2 text-xs text-red-500">{uploadError}</p>
        )}

        {/* Short Description */}
        <div className="mt-8">
          <Controller
            name="shortDescription"
            control={control}
            rules={{ required: "Short Description is required" }}
            render={({ field }) => (
              <RichTextEditor
                label="Short Description"
                placeholder="Write here..."
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.shortDescription && (
            <p className="mt-1 text-xs text-red-500">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
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
