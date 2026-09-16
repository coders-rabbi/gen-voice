"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { updateReporterById } from "@/services/reporter/reporterService";
import { TReporter } from "@/types/reporter";
import Swal from "sweetalert2";

type ProfileFormProps = {
  reporterId?: string;
  defaultValues?: Partial<TReporter>;
  onSuccess?: () => void;
};

type UploadBoxProps = {
  title: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxSizeLabel?: string;
};

const UploadBox = ({
  title,
  inputRef,
  onChange,
  maxSizeLabel = "MAX 10 MB",
}: UploadBoxProps) => (
  <div
    onClick={() => inputRef.current?.click()}
    className="w-full py-10 bg-[#F8FAFC] border-2 border-dashed border-[#D9DEE7] rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-[#F1F5F9] cursor-pointer"
  >
    <input
      ref={inputRef}
      type="file"
      className="hidden"
      accept="image/*"
      onChange={onChange}
    />
    <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-3">
      <ImagePlus className="text-white w-6 h-6" />
    </div>
    <p className="text-[#2563EB] font-semibold text-base mb-1">{title}</p>
    <p className="text-sm text-[#94A3B8] text-center leading-snug">
      Drag & Drop or Choose file
      <br />
      To upload media {maxSizeLabel}.
    </p>
  </div>
);

const UpdateProfileForm = ({
  reporterId,
  defaultValues,
  onSuccess,
}: ProfileFormProps) => {
  // profile image state
  const [profilePreview, setProfilePreview] = useState<string | null>(
    defaultValues?.profileImage ?? null,
  );
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImagePublicId, setProfileImagePublicId] = useState<
    string | null
  >(null);
  const [isProfileUploading, setIsProfileUploading] = useState(false);
  const [profileUploadError, setProfileUploadError] = useState<string | null>(
    null,
  );

  // cover image state
  const [coverPreview, setCoverPreview] = useState<string | null>(
    defaultValues?.coverImage ?? null,
  );
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [coverImagePublicId, setCoverImagePublicId] = useState<string | null>(
    null,
  );
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  console.log("profileImage:", defaultValues);
  console.log("coverImage:", defaultValues?.coverImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReporter>({
    defaultValues: {
      name: {
        firstName: defaultValues?.name?.firstName ?? "",
        middleName: defaultValues?.name?.middleName ?? "",
        lastName: defaultValues?.name?.lastName ?? "",
      },
      contactNo: defaultValues?.contactNo ?? "",
      presentAddress: defaultValues?.presentAddress ?? "",
    },
  });

  // shared upload helper
  const uploadImage = async (
    file: File,
    setPreview: (v: string | null) => void,
    setUrl: (v: string | null) => void,
    setPublicId: (v: string | null) => void,
    setUploading: (v: boolean) => void,
    setError: (v: string | null) => void,
  ) => {
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB");
      return;
    }

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);
      setError(null);

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

      setUrl(result.data.url);
      setPublicId(result.data.publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(
      file,
      setProfilePreview,
      setProfileImageUrl,
      setProfileImagePublicId,
      setIsProfileUploading,
      setProfileUploadError,
    );
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(
      file,
      setCoverPreview,
      setCoverImageUrl,
      setCoverImagePublicId,
      setIsCoverUploading,
      setCoverUploadError,
    );
  };

  const removeProfileImage = () => {
    setProfilePreview(null);
    setProfileImageUrl(null);
    setProfileImagePublicId(null);
    setProfileUploadError(null);
    if (profileInputRef.current) profileInputRef.current.value = "";
  };

  const removeCoverImage = () => {
    setCoverPreview(null);
    setCoverImageUrl(null);
    setCoverImagePublicId(null);
    setCoverUploadError(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  const onSubmit = async (data: Partial<TReporter>) => {
    if (!reporterId) return;

    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        ...(profileImageUrl && {
          profileImage: profileImageUrl,
        }),
        ...(coverImageUrl && { coverImage: coverImageUrl }),
      };

      const res = await updateReporterById(reporterId, payload);

      if (!res.success) {
        throw new Error(res?.message || "Update failed");
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Profile successfully created.",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      onSuccess?.();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Profile failed to update.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="px-4 mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row md:gap-4 w-full">
        <div className="w-full">
          <legend className="fieldset-legend block text-[#3E3232]">
            First Name
          </legend>
          <input
            type="text"
            {...register("name.firstName")}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
            placeholder=""
          />
        </div>

        <div className="w-full">
          <legend className="fieldset-legend block text-[#3E3232]">
            Middle Name
          </legend>
          <input
            type="text"
            {...register("name.middleName")}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
            placeholder=""
          />
        </div>

        <div className="w-full">
          <legend className="fieldset-legend block text-[#3E3232]">
            Last Name
          </legend>
          <input
            type="text"
            {...register("name.lastName")}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
            placeholder=""
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4 w-full md:mt-3">
        <div className="w-full">
          <legend className="fieldset-legend block text-[#3E3232]">
            Email
          </legend>
          <input
            type="text"
            {...register("contactNo")}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
            placeholder=""
          />
        </div>
        <div className="w-full">
          <legend className="fieldset-legend block text-[#3E3232]">
            Present Address
          </legend>
          <input
            type="text"
            {...register("presentAddress")}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
            placeholder=""
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 mt-3">
        {/* Profile image upload */}
        <div className="bg-white rounded-xl w-full">
          <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
            Add Profile
          </h3>

          {isProfileUploading ? (
            <div className="w-full h-56 rounded-2xl bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#3E3232]" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : profilePreview ? (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden group">
              {/* input stays mounted even in preview state, so ref.current is never null */}
              <input
                ref={profileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileChange}
              />
              <img
                src={profilePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeProfileImage}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-all"
              >
                <IoClose className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => profileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all text-white font-medium text-sm"
              >
                Change Image
              </button>
            </div>
          ) : (
            <UploadBox
              title="Upload Profile Photo"
              inputRef={profileInputRef}
              onChange={handleProfileChange}
            />
          )}
          {profileUploadError && (
            <p className="mt-2 text-xs text-red-500">{profileUploadError}</p>
          )}
        </div>

        {/* Cover image upload */}
        <div className="bg-white rounded-xl w-full">
          <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
            Add Cover
          </h3>

          {isCoverUploading ? (
            <div className="w-full h-56 rounded-2xl bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#3E3232]" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : coverPreview ? (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden group">
              {/* input stays mounted even in preview state, so ref.current is never null */}
              <input
                ref={coverInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverChange}
              />
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-all"
              >
                <IoClose className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all text-white font-medium text-sm"
              >
                Change Image
              </button>
            </div>
          ) : (
            <UploadBox
              title="Upload Cover Photo"
              inputRef={coverInputRef}
              onChange={handleCoverChange}
            />
          )}
          {coverUploadError && (
            <p className="mt-2 text-xs text-red-500">{coverUploadError}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isProfileUploading || isCoverUploading || isSubmitting}
          className="mt-4 mb-5 px-6 py-2.5 bg-[#2563EB] text-white rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
