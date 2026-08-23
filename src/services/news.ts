import { IPost } from "@/types/news";
import { apiClient } from "./apiClient";

export const getAllNews = async (): Promise<IPost[]> => {
  return apiClient<IPost[]>("/blogs", {
    next: {
      revalidate: 60,
    },
  });
};

