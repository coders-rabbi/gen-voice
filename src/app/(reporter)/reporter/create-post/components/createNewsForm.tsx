"use client";

import { useState } from "react";
import {
  FaAlignLeft,
  FaEye,
  FaImage,
  FaPen,
  FaPlus,
  FaRegFolderOpen,
} from "react-icons/fa6";
import { HiCodeBracket } from "react-icons/hi2";
import { CiLink } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { MdNoteAdd } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { TCategory } from "@/types/category";
import { createNews } from "@/services/news"; // adjust path to match your project
import { TNewsPayload } from "@/types/news"; // adjust path to match your project
import Swal from "sweetalert2"; // npm install sweetalert2
import { authkey } from "@/constants/authkey";
import { getUserInfo } from "@/services/actions/auth.service";
import { useSingleReporter } from "@/hooks/useSingleReporter";

type CategoriesProps = {
  categories: TCategory[];
  reporterId: string;
};

const statusLabels: Record<"draft" | "preview" | "published", string> = {
  draft: "saved as draft",
  preview: "saved as preview",
  published: "published",
};

const CreateNewsForm = ({ categories, reporterId }: CategoriesProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState("No");
  const [mediaType, setMediaType] = useState<"Image" | "Video">("Image");
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem(authkey);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMediaType(e.target.value as "Image" | "Video");
    // Clear a previously selected file if it no longer matches the chosen type
    setFile(null);
  };

  const uploadFile = async (fileToUpload: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", fileToUpload);

    // Do NOT set a Content-Type header manually — the browser sets
    // multipart/form-data with the correct boundary automatically.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/upload_file`,
      {
        method: "POST",
        body: formData,
        credentials: "include", // drop this if your backend doesn't use cookies/auth
      },
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.url as string;
  };

  const buildPayload = async (
    status: "draft" | "published",
  ): Promise<TNewsPayload> => {
    if (!categoryId) {
      throw new Error("Please select a news category");
    }
    if (!file) {
      throw new Error(
        mediaType === "Image"
          ? "Please add a featured image"
          : "Please add a featured image (used as the video thumbnail) and video file",
      );
    }

    const uploadedUrl = await uploadFile(file);

    const payload: TNewsPayload = {
      reporterId: reporterId,
      approvedBy: "N?A",

      categoryId,

      title,
      slug,
      shortDetails: shortDescription,
      content,
      contentType: mediaType === "Image" ? "Text" : mediaType,
      featuredImageUrl: uploadedUrl,
      imageCaption: "N/A",
      galleryImages: "N?A",

      tags,

      source: "N/A",
      sourceUrl: "N/A",

      status,
      isAnonymous: isAnonymous === "Yes",
    };

    if (mediaType === "Video") {
      payload.videoUrl = uploadedUrl;
    }
    if (location) {
      payload.location = location;
    }
    if (status === "published") {
      payload.publishAt = new Date();
    }

    return payload;
  };

  const handlePreview = () => {
    Swal.fire({
      title,
      html: `<div style="text-align:left">${content || "<em>No content yet</em>"}</div>`,
      width: 700,
      confirmButtonText: "Close",
    });
  };

  const submitWithStatus = async (status: "draft" | "published") => {
    setIsSubmitting(true);
    try {
      const payload = await buildPayload(status);

      if (!token) {
        return;
      }
      const res = await createNews(payload, token as string);

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `News ${statusLabels[status]} successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form on a clean publish/draft save
      setTitle("");
      setSlug("");
      setTags([]);
      setShortDescription("");
      setContent("");
      setFile(null);
      setCategoryId("");
      setLocation("");
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraft = () => submitWithStatus("draft");
  const handlePublish = () => submitWithStatus("published");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 mt-12 gap-6 px-4">
      <div className="md:col-span-9">
        <div className="flex gap-6 w-full">
          {/* Title Input Field */}
          <div className="w-1/2">
            <legend className="fieldset-legend mb-2 block text-black">
              Title
            </legend>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder="Title here..."
            />
          </div>

          {/* Add Tag Input Field */}
          <div className="w-1/2">
            <legend className="fieldset-legend mb-2 block text-black">
              Add Tag
            </legend>
            <label className="input validator bg-[#F5F5F5] rounded-[10px] w-full flex items-center justify-between px-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tags..."
                className="text-black bg-transparent outline-none w-full pr-2"
              />
              <FaPlus
                className="text-gray-500 cursor-pointer shrink-0"
                onClick={handleAddTag}
              />
            </label>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#F5F5F5] text-[#3385FF] px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#3385FF]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full mt-6">
          <div className="w-full">
            <legend className="fieldset-legend block text-black">Slug</legend>
            <input
              type="text"
              value={slug}
              required
              onChange={(e) => setSlug(e.target.value)}
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder="Slug here.."
            />
          </div>

          <div className="w-full">
            <legend className="fieldset-legend block text-black">
              Location
            </legend>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black"
              placeholder="e.g. Dhaka, Bangladesh"
            />
          </div>

          <h4 className="">Short Description</h4>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="textarea h-25 rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
            placeholder="Type..."
          ></textarea>
        </div>

        <div className="mt-7">
          <h4 className="mb-2">Content</h4>
          <div className="p-4 shadow-sm rounded-2xl">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 py-2">
              <button
                type="button"
                className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]"
              >
                <FaImage />
                Image
              </button>
              <button
                type="button"
                className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]"
              >
                <FaPen />
                Color
              </button>
              <button
                type="button"
                className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]"
              >
                <HiCodeBracket />
                Text
              </button>
              <button
                type="button"
                className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]"
              >
                <FaAlignLeft />
                Align
              </button>
              <button
                type="button"
                className="btn btn-sm border-none bg-[#F5F5F5] text-[#3E3232BF]"
              >
                <CiLink />
                Link
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea h-75 rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
              placeholder="Type..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
              Post Anonymously
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
              <select
                value={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.value)}
                className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
              News Category
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((item) => (
                  <option value={item?._id} key={item?._id}>
                    {item?.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
              Selected Media Type
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
              <select
                value={mediaType}
                onChange={handleMediaTypeChange}
                className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
              >
                <option>Image</option>
                <option>Video</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl">
            <h3 className="text-lg font-semibold text-[#3E3232] mb-3">
              Add File
            </h3>

            <div className="w-full py-8 bg-[#F8F9FA] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-[#F3F4F6]">
              <input
                type="file"
                className="hidden"
                accept={mediaType === "Image" ? "image/*" : "video/*"}
                id="file-upload"
                onChange={handleFileChange}
              />
              <div className="text-[#C4C4C4] text-7xl mb-4">
                <FaRegFolderOpen strokeWidth={0.5} />
              </div>
              <p className="text-sm text-[#71717A] text-center mb-5 font-medium">
                {file?.name}
              </p>
              <label
                htmlFor="file-upload"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#E4E4E7] text-[#3F3F46] rounded-xl font-medium shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              >
                <FiPlus className="text-lg text-[#71717A]" />
                Select
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-2 my-6">
          <button
            type="button"
            onClick={handleDraft}
            disabled={isSubmitting}
            className="text-xs px-3 py-2 flex items-center gap-2 bg-[#F5F5F5] rounded-[12px] w-fit disabled:opacity-50"
          >
            <MdNoteAdd /> Draft
          </button>
          <button
            type="button"
            onClick={handlePreview}
            disabled={isSubmitting}
            className="text-xs px-3 py-2 flex items-center gap-2 bg-[#F5F5F5] rounded-[12px] w-fit disabled:opacity-50"
          >
            <FaEye /> Preview
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting}
            className="text-xs px-3 py-2 flex items-center gap-2 bg-[#3385FF] text-white rounded-[10px] w-fit disabled:opacity-50"
          >
            <BsSend /> Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsForm;
