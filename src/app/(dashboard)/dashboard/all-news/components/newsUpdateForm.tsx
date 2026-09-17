"use client";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { TCategory } from "@/types/category";
import { createNews, updateNews } from "@/services/news/news.service";
import { TNews, TNewsPayload } from "@/types/news";
import Swal from "sweetalert2";
import { authkey } from "@/constants/authkey";
import RichTextEditor from "@/components/RichTextEditor";
import useSWR from "swr";
import { getAllNewsCategories } from "@/services/category";

type CategoriesProps = {
  categories: TCategory[];
  reporterId: string;
};

const statusLabels: Record<
  "draft" | "preview" | "published" | "pending",
  string
> = {
  draft: "saved as draft",
  preview: "saved as preview",
  published: "published",
  pending: "submitted for review",
};

interface newsProps {
  news: TNews;
}

const NewsUpdateForm = ({ news }: newsProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState("No");
  const [mediaType, setMediaType] = useState<"Image" | "Video">("Image");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem(authkey);

  const { data: categories, isLoading } = useSWR(["news-categories"], () =>
    getAllNewsCategories(),
  );

  useEffect(() => {
    if (!news) return;

    setTitle(news.title || "");
    setSlug(news.slug || "");
    setTags(news.tags || []);
    setShortDescription(news.shortDetails || "");
    setContent(news.content || "");
    setIsAnonymous(news.isAnonymous ? "Yes" : "No");
    setCategoryId(
      typeof news.categoryId === "string"
        ? news.categoryId
        : news.categoryId?._id || "",
    );
    setLocation(news.location || "");

    if (news.contentType === "Video") {
      setMediaType("Video");
      setFilePreview(news.videoUrl || news.featuredImageUrl || null);
    } else {
      setMediaType("Image");
      setFilePreview(news.featuredImageUrl || null);
    }
  }, [news]);

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
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // আগের preview URL থাকলে revoke করে memory leak এড়ানো
      setFilePreview((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(selectedFile);
      });
    }
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMediaType(e.target.value as "Image" | "Video");
    setFile(null);
    setFilePreview((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return null;
    });
  };

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFile = async (fileToUpload: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", fileToUpload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/upload_file`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.url as string;
  };

  const buildPayload = async (
    status: "draft" | "published" | "pending",
  ): Promise<Partial<TNewsPayload>> => {
    if (!categoryId) {
      throw new Error("Please select a news category");
    }

    let mediaUrl = news?.featuredImageUrl || "";
    if (file) {
      mediaUrl = await uploadFile(file);
    } else if (!mediaUrl && mediaType === "Video") {
      mediaUrl = news?.videoUrl || "";
    }

    if (!mediaUrl) {
      throw new Error(
        mediaType === "Image"
          ? "Please add a featured image"
          : "Please add a featured image (used as the video thumbnail) and video file",
      );
    }

    const payload: Partial<TNewsPayload> = {
      categoryId,
      title,
      slug,
      shortDetails: shortDescription,
      content,
      contentType: mediaType === "Image" ? "Text" : mediaType,
      featuredImageUrl: mediaUrl,
      imageCaption: "N/A",
      tags,
      source: "N/A",
      sourceUrl: "",
      status,
      isAnonymous: isAnonymous === "Yes",
    };

    if (mediaType === "Video") {
      payload.videoUrl = file ? mediaUrl : news?.videoUrl || mediaUrl;
    }
    if (location) {
      payload.location = location;
    }
    if (status === "published") {
      payload.publishAt = new Date();
    }

    return payload;
  };

  const submitWithStatus = async (
    status: "draft" | "published" | "pending",
  ) => {
    setIsSubmitting(true);
    try {
      const payload = await buildPayload(status);

      if (!token) {
        return;
      }

      const res = news?.newsId
        ? await updateNews(news.newsId, payload, token)
        : await createNews(payload as TNewsPayload, token);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `News ${statusLabels[status]} successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
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

  const handleUpdate = () => submitWithStatus("published");

  return (
    <div className="px-4 mt-12">
      <div className="flex gap-6 w-full">
        <div className="w-1/2">
          <legend className="fieldset-legend mb-2 block text-black">
            Title
          </legend>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black border border-[#3385FF]"
            placeholder="Title here..."
          />
        </div>

        <div className="w-1/2">
          <legend className="fieldset-legend mb-2 block text-black">
            Add Tag
          </legend>
          <label className="input validator bg-[#F5F5F5] rounded-[10px] w-full flex items-center justify-between px-3 border border-[#3385FF]">
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
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black border border-[#3385FF]"
            placeholder="Slug here.."
          />
        </div>

        <div className="w-full">
          <legend className="fieldset-legend block text-black">Location</legend>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input validator bg-[#F5F5F5] rounded-[10px] w-full text-black border border-[#3385FF]"
            placeholder="e.g. Dhaka, Bangladesh"
          />
        </div>

        <h4 className="">Short Description</h4>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="textarea h-25 rounded-[8px] border border-[#3385FF] w-full bg-[#F5F5F5] text-[#3E3232BF]"
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="my-5">
        <RichTextEditor
          label="Description"
          value={content}
          onChange={setContent}
          placeholder="Write your description..."
        />
      </div>

      {/* Post Anonymously, Category, Media Type — one row */}
      <div className="flex gap-6 mt-6">
        <div className="relative w-1/3">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            Post Anonymously
          </label>
          <div className="flex items-center justify-between border border-[#3385FF] rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-[#3385FF]">
            <select
              value={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.value)}
              className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-none rounded-xs text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        <div className="relative w-1/3">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            News Category
          </label>
          <div className="flex items-center justify-between border border-[#3385FF] rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-[#3385FF]">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-none rounded-xs text-sm"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories?.map((item) => (
                <option value={item?._id} key={item?._id}>
                  {item?.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-1/3">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
            Selected Media Type
          </label>
          <div className="flex items-center justify-between border border-[#3385FF] rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-[#3385FF]">
            <select
              value={mediaType}
              onChange={handleMediaTypeChange}
              className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-none rounded-xs text-sm"
            >
              <option>Image</option>
              <option>Video</option>
            </select>
          </div>
        </div>
      </div>

      {/* Image upload — full width, with margin */}
      <div className="bg-white rounded-xl mt-8 p-2">
        <h3 className="text-lg font-semibold text-[#3E3232] mb-3">Add File</h3>

        <div
          onClick={() => document.getElementById("file-upload")?.click()}
          className="relative w-full h-50 bg-[#F8FAFC] border-2 border-dashed border-[#D9DEE7] rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-[#F1F5F9] cursor-pointer overflow-hidden group"
        >
          <input
            type="file"
            className="hidden"
            accept={mediaType === "Image" ? "image/*" : "video/*"}
            id="file-upload"
            onChange={handleFileChange}
          />

          {filePreview ? (
            <>
              {mediaType === "Image" ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={filePreview}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all text-white font-medium text-sm">
                Change {mediaType === "Image" ? "Image" : "Video"}
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center mb-3">
                <ImagePlus className="text-white w-6 h-6" />
              </div>
              <p className="text-[#2563EB] font-semibold text-sm mb-1">
                Upload {mediaType === "Image" ? "Image" : "Video"}
              </p>
              <p className="text-xs text-[#94A3B8] text-center leading-snug">
                Drag & Drop or Choose file
                <br />
                To upload media MAX 10 MB.
              </p>
            </>
          )}
        </div>

        {file?.name && (
          <p className="text-sm text-[#71717A] mt-2 font-medium truncate max-w-full">
            {file.name}
          </p>
        )}
      </div>

      {/* Update News button */}
      <div className="my-6">
        <button
          type="button"
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="text-xs px-4 py-2 flex items-center gap-2 bg-[#3385FF] text-white rounded-[10px] w-fit disabled:opacity-50"
        >
          <BsSend /> {isSubmitting ? "Updating..." : "Update News"}
        </button>
      </div>
    </div>
  );
};

export default NewsUpdateForm;
