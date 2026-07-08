import { IPost } from "@/types/blogs";
import { apiClient } from "./apiClient";

export const getAllBlog = async (): Promise<IPost[]> => {
  return apiClient<IPost[]>("/blogs", {
    next: {
      revalidate: 60,
    },
  });
};
