import { IPost } from "@/types/blogs";
import { apiClient } from "./apiClient";
import { IWriter } from "@/types/wrtiers";

export const getAllBlog = async (): Promise<IPost[]> => {
  return apiClient<IPost[]>("/blogs", {
    next: {
      revalidate: 60,
    },
  });
};

