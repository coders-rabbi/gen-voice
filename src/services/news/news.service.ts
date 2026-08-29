import { THomePageNews, TNews, TNewsPayload } from "@/types/news";
import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";

export const getAllNews = async (): Promise<TNews[]> => {
  return apiClient<TNews[]>("/news", {
    next: {
      revalidate: 60,
    },
  });
};
export const getAllVideoNews = async (): Promise<TNews[]> => {
  return apiClient<TNews[]>("/news/video-news", {
    next: {
      revalidate: 60,
    },
  });
};

export const getHomePageCategoryNews = async (): Promise<THomePageNews> => {
  return apiClient<THomePageNews>("/news/homecategory", {
    next: {
      revalidate: 60,
    },
  });
};

export const createNews = async (
  payload: TNewsPayload,
  token: string,
): Promise<ApiResponse<TNews>> => {
  return apiClientRaw<TNews>("/news/create_news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
