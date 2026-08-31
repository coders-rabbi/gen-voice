import {
  THomePageNews,
  TNews,
  TNewsPayload,
  TNewsQueryParams,
} from "@/types/news";
import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";

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

export const getAllNews = async (
  query: TNewsQueryParams = {},
): Promise<TNews[]> => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `/news?${queryString}` : "/news";

  return apiClient<TNews[]>(url, {
    cache: "no-cache",
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

export const getSingleReporterAllNews = async (token: string) => {
  return apiClient<TNews[]>("/news/reporterNews", {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNewsStatus = async (
  token: string,
  newsId: string,
  payload: Partial<TNewsPayload>,
): Promise<ApiResponse<TNews>> => {
  return apiClientRaw<TNews>(`/news/status/${newsId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
