"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ImagePlus, RotateCcw, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import useSWR from "swr";
import { authkey } from "@/constants/authkey";
import { getFromLocalStorage } from "../../../../../../../utils/localStorage";
import {
  createWebFooterInfo,
  getWebFooterInfo,
  updateWebFooterInfo,
} from "@/services/footer";

const VIDEO_COUNT = 9;

type FooterFormValues = {
  navLogo: string;
  footerLogo: string;
  subHeading: string;
  description: string;
  facebook: string;
  instagram: string;
  youtube: string;
  videos: string[];
  copyRight: string;
};

const emptyValues: FooterFormValues = {
  navLogo: "",
  footerLogo: "",
  subHeading: "",
  description: "",
  facebook: "",
  instagram: "",
  youtube: "",
  videos: Array.from({ length: VIDEO_COUNT }, () => ""),
  copyRight: "",
};

const UPLOAD_URL =
  "https://gen-voice-backend.onrender.com/api/v1/upload/upload_file";

const urlRule = {
  pattern: {
    value: /^https?:\/\/.+/i,
    message: "Enter a valid link (https://...)",
  },
};

const inputClass =
  "w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
const labelClass = "mb-2 block text-sm font-medium text-gray-800";

/* ---------- Logo upload field ---------- */
type LogoUploadProps = {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  error?: string;
};

const LogoUpload = ({ id, label, value, onChange, error }: LogoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10 MB");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Upload failed");

      onChange(result.data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <label
        htmlFor={id}
        className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center transition-colors hover:bg-gray-100"
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : value ? (
          <>
            <Image
              src={value}
              alt={label}
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
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
            <p className="text-sm font-medium text-blue-600">Upload {label}</p>
            <p className="text-xs text-gray-400">MAX 10 MB</p>
          </>
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={isUploading}
        />
      </label>
      {(uploadError || error) && (
        <p className="mt-1 text-xs text-red-500">{uploadError || error}</p>
      )}
    </div>
  );
};

/* ---------- Form ---------- */
const FooterBrandingForm = () => {
  const token = getFromLocalStorage(authkey);
  const { data: webFooterInfo, mutate } = useSWR(
    token ? ["webFooterInfo", token] : null,
    () => getWebFooterInfo(),
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FooterFormValues>({ defaultValues: emptyValues });

  const toFormValues = (): FooterFormValues => {
    const footer = webFooterInfo?.data;
    if (!footer) return emptyValues;
    return {
      navLogo: footer.navLogo ?? "",
      footerLogo: footer.footerLogo ?? "",
      subHeading: footer.subHeading ?? "",
      description: footer.description ?? "",
      facebook: footer.facebook ?? "",
      instagram: footer.instagram ?? "",
      youtube: footer.youtube ?? "",
      videos: Array.from(
        { length: VIDEO_COUNT },
        (_, i) => footer.videos?.[i] ?? "",
      ),
      copyRight: footer.copyRight ?? "",
    };
  };

  useEffect(() => {
    if (webFooterInfo?.data) {
      reset(toFormValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webFooterInfo, reset]);

  const onSubmit: SubmitHandler<FooterFormValues> = async (data) => {
    try {
      const isUpdate = !!webFooterInfo?.data;

      const payload = {
        ...data,
        // ফাঁকা video ঘরগুলো বাদ দিয়ে শুধু দেওয়া link গুলো পাঠানো
        videos: data.videos.map((v) => v.trim()).filter(Boolean),
      };

      const res = isUpdate
        ? await updateWebFooterInfo(token as string, payload)
        : await createWebFooterInfo(token as string, payload);

      if (!res.success) {
        throw new Error(res?.message || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: isUpdate ? "Updated" : "Added",
        text: isUpdate
          ? "Web footer successfully updated."
          : "Web footer successfully created.",
        timer: 2000,
        showConfirmButton: false,
      });

      mutate();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err instanceof Error ? err.message : "Web footer can't be saved",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full">
      {/* Logos */}
      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="navLogo"
          control={control}
          rules={{ required: "Nav logo is required" }}
          render={({ field }) => (
            <LogoUpload
              id="nav-logo"
              label="Navbar Logo"
              value={field.value}
              onChange={field.onChange}
              error={errors.navLogo?.message}
            />
          )}
        />
        <Controller
          name="footerLogo"
          control={control}
          rules={{ required: "Footer logo is required" }}
          render={({ field }) => (
            <LogoUpload
              id="footer-logo"
              label="Footer Logo"
              value={field.value}
              onChange={field.onChange}
              error={errors.footerLogo?.message}
            />
          )}
        />
      </div>

      {/* Sub heading */}
      <div className="mt-6">
        <label className={labelClass}>Sub Heading</label>
        <input
          type="text"
          placeholder="Write here..."
          {...register("subHeading", { required: "Sub heading is required" })}
          className={inputClass}
        />
        {errors.subHeading && (
          <p className="mt-1 text-xs text-red-500">
            {errors.subHeading.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className={labelClass}>Description</label>
        <textarea
          rows={4}
          placeholder="Write your description..."
          {...register("description", { required: "Description is required" })}
          className={inputClass}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Social links */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <label className={labelClass}>Facebook</label>
          <input
            type="text"
            placeholder="https://facebook.com/..."
            {...register("facebook", urlRule)}
            className={inputClass}
          />
          {errors.facebook && (
            <p className="mt-1 text-xs text-red-500">
              {errors.facebook.message}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input
            type="text"
            placeholder="https://instagram.com/..."
            {...register("instagram", urlRule)}
            className={inputClass}
          />
          {errors.instagram && (
            <p className="mt-1 text-xs text-red-500">
              {errors.instagram.message}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>YouTube</label>
          <input
            type="text"
            placeholder="https://youtube.com/..."
            {...register("youtube", urlRule)}
            className={inputClass}
          />
          {errors.youtube && (
            <p className="mt-1 text-xs text-red-500">
              {errors.youtube.message}
            </p>
          )}
        </div>
      </div>

      {/* Video links */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Video Links
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: VIDEO_COUNT }, (_, index) => (
            <div key={index}>
              <label className={labelClass}>Video {index + 1}</label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                {...register(`videos.${index}` as const, urlRule)}
                className={inputClass}
              />
              {errors.videos?.[index] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.videos[index]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6">
        <label className={labelClass}>Copyright</label>
        <input
          type="text"
          placeholder="© 2026 GenVoice. All rights reserved."
          {...register("copyRight", { required: "Copyright is required" })}
          className={inputClass}
        />
        {errors.copyRight && (
          <p className="mt-1 text-xs text-red-500">
            {errors.copyRight.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => reset(toFormValues())}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-red-300 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </button>
      </div>
    </form>
  );
};

export default FooterBrandingForm;
