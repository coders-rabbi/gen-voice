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

export const getNewsByReporterId = async (repId: string) => {
  return apiClient<TNews[]>(`/news/${repId}/news`, {
    cache: "no-cache",
  });
};

export async function getRecentNews() {
  const data = await getAllNews();
  return [...data].sort((a, b) => {
    const dateA = a.publishAt ? new Date(a.publishAt).getTime() : 0;
    const dateB = b.publishAt ? new Date(b.publishAt).getTime() : 0;
    return dateB - dateA;
  });
}

// export async function getPopularNews() {
//   const data = await getAllNews();
//   return [...data].sort(
//     (a, b) => (b.totalViewsCount ?? 0) - (a.totalViewsCount ?? 0),
//   );
// }

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

export const getNewsByCategory = async (
  categoryId: string,
): Promise<ApiResponse<TNews[]>> => {
  return apiClientRaw<TNews[]>(`/news/${categoryId}/category`, {
    method: "GET",
  });
};
